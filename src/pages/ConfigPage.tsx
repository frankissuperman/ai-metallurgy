import { useState } from 'react';
import { mockFurnaces, ProductionConfig, mockMaterials, Material } from '../data/mockData';
import { Settings, Thermometer, Activity, AlertCircle, CheckCircle2, Package, AlertTriangle, Factory } from 'lucide-react';

export default function ConfigPage() {
  const [furnaces] = useState<ProductionConfig[]>(mockFurnaces);
  const [materials] = useState<Material[]>(mockMaterials);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available': return <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={14}/>可用</span>;
      case 'maintenance': return <span className="flex items-center gap-1 text-orange-600"><AlertCircle size={14}/>维护中</span>;
      case 'running': return <span className="flex items-center gap-1 text-blue-600"><Activity size={14}/>运行中</span>;
      default: return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-50 border-green-200';
      case 'maintenance': return 'bg-orange-50 border-orange-200';
      case 'running': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">厂区概况</h1>
          <p className="text-gray-500 mt-1">查看厂区设备、原材料与生产约束配置</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Settings size={18} />
          保存配置
        </button>
      </div>

      {/* 连续生产约束说明 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">🏭 厂区核心约束（连续生产保障）</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
          <span>✓ 炉次时序必须衔接，不允许无故断流</span>
          <span>✓ 单炉重量必须在容量上下限内</span>
          <span>✓ 成分接近的钢种方可合炉</span>
          <span>✓ 设备状态必须满足连续作业要求</span>
        </div>
      </div>

      {/* 炉窑卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {furnaces.map((furnace) => (
          <div key={furnace.furnaceId} className={`bg-white rounded-xl shadow-sm border-2 ${getStatusBg(furnace.status)} p-5`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{furnace.furnaceName}</h3>
                <p className="text-sm text-gray-500">{furnace.furnaceId} · {furnace.location}</p>
              </div>
              {getStatusBadge(furnace.status)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Thermometer className="text-gray-400" size={16} />
                <span className="text-gray-600">炉龄：</span>
                <span className="font-medium">{furnace.furnaceAge} 炉</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Activity className="text-gray-400" size={16} />
                <span className="text-gray-600">容量范围：</span>
                <span className="font-medium">{furnace.minCapacity} - {furnace.maxCapacity} 吨</span>
              </div>

              <div>
                <span className="text-sm text-gray-600 block mb-2">可用钢种：</span>
                <div className="flex flex-wrap gap-2">
                  {furnace.steelGrades.map((grade) => (
                    <span key={grade} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 容量进度条 */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">今日利用率</span>
                <span className="font-medium text-gray-700">
                  {furnace.status === 'maintenance' ? '维护中' : furnace.status === 'running' ? '85%' : '72%'}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  style={{ width: furnace.status === 'maintenance' ? '0%' : furnace.status === 'running' ? '85%' : '72%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 快速约束配置 */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">快速约束配置</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">最小炉次间隔(分钟)</label>
            <input type="number" defaultValue={15} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">换钢种清洗时间(分钟)</label>
            <input type="number" defaultValue={30} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">最大连续炉数</label>
            <input type="number" defaultValue={8} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">温度下限(°C)</label>
            <input type="number" defaultValue={1550} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* 原材料库存约束 */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Package className="text-purple-600" size={20} />
          <h3 className="font-semibold text-gray-800">原材料库存约束</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">原材料库存影响排产可行性，低于最小库存时触发预警</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">原材料</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">类别</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">当前库存</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">最小库存</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">库存状态</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">可用钢种</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {materials.map((material) => {
                const isLowStock = material.stock < material.minStock;
                const stockPercent = (material.stock / (material.minStock * 3)) * 100;
                return (
                  <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{material.name}</span>
                        <span className="text-xs text-gray-400">{material.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{material.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium">{material.stock}</span>
                      <span className="text-gray-400 text-sm"> {material.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{material.minStock} {material.unit}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isLowStock ? (
                          <AlertTriangle className="text-red-500" size={16} />
                        ) : (
                          <CheckCircle2 className="text-green-500" size={16} />
                        )}
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isLowStock ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(stockPercent, 100)}%` }}
                          />
                        </div>
                        <span className={`text-xs ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                          {isLowStock ? '库存不足' : '正常'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {material.usedInGrades.map((grade) => (
                          <span key={grade} className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">{grade}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
