import { useState } from 'react';
import { mockOrders, mockStandardProducts, Order, StandardProduct } from '../data/mockData';
import { Package, Clock, AlertTriangle, CheckCircle, Upload, Plus, Warehouse } from 'lucide-react';

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [standardProducts] = useState<StandardProduct[]>(mockStandardProducts);
  const [activeTab, setActiveTab] = useState<'orders' | 'standards'>('orders');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">待排产</span>;
      case 'scheduled': return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">已排产</span>;
      case 'completed': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">已完成</span>;
      default: return null;
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">订单管理</h1>
          <p className="text-gray-500 mt-1">管理炼钢订单与标准品，适配连续生产排程</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            <Upload size={18} />
            导入订单
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} />
            新增订单
          </button>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Package size={16} className="inline mr-2" />
          定制订单
        </button>
        <button
          onClick={() => setActiveTab('standards')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'standards' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Warehouse size={16} className="inline mr-2" />
          标准品库存
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">总订单数</p>
              <p className="text-xl font-bold">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">待排产</p>
              <p className="text-xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">紧急订单</p>
              <p className="text-xl font-bold">{orders.filter(o => o.priority === 'high' && o.status === 'pending' && o.orderType === 'custom').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Warehouse className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">标准品</p>
              <p className="text-xl font-bold">{orders.filter(o => o.orderType === 'standard').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">高兼容度</p>
              <p className="text-xl font-bold">{orders.filter(o => o.compatibilityScore >= 90).length}</p>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <>
          {/* 订单表格 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">订单ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">钢种</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">重量(吨)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">交期</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">优先级</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">兼容度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{order.id}</td>
                    <td className="px-4 py-3">
                      {order.orderType === 'standard' ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">标准品</span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">定制单</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{order.steelGrade}</td>
                    <td className="px-4 py-3 text-gray-600">{order.weight}</td>
                    <td className="px-4 py-3 text-gray-600">{order.orderType === 'standard' ? '-' : order.deliveryDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        {order.priority === 'high' ? '高' : order.priority === 'medium' ? '中' : '低'}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-medium ${getCompatibilityColor(order.compatibilityScore)}`}>
                      {order.compatibilityScore}%
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* 标准品库存展示 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
              <p className="text-sm text-purple-700">
                💡 <strong>标准品</strong>：用于填充连续生产间隙，生产后入库备售
              </p>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">标准品编号</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">钢种</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">规格</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">当前库存</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">最低库存</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">库存状态</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">参考价格</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {standardProducts.map((product) => {
                  const isLowStock = product.stockWeight < product.minStock;
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-800">{product.id}</td>
                      <td className="px-4 py-3 text-gray-600">{product.steelGrade}</td>
                      <td className="px-4 py-3 text-gray-600">{product.specification}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                          {product.stockWeight}
                        </span>
                        <span className="text-gray-400 text-sm"> 吨</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{product.minStock} 吨</td>
                      <td className="px-4 py-3">
                        {isLowStock ? (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">库存不足</span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">正常</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">¥{product.price.toLocaleString()}/吨</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
