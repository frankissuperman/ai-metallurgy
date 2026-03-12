import { useState } from 'react';
import { mockHeatPlans, steelGradeColors, HeatPlan, mockOrders, Order } from '../data/mockData';
import { RefreshCw, Lock, AlertTriangle, Plus, Minus, ArrowUp, ArrowDown, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function AdjustmentPage() {
  const [heatPlans, setHeatPlans] = useState<HeatPlan[]>(mockHeatPlans);
  const [orders] = useState<Order[]>(mockOrders.filter(o => o.status === 'pending'));
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleResult, setRescheduleResult] = useState<string | null>(null);

  // 模拟增量重排
  const handleReschedule = () => {
    setIsRescheduling(true);
    setRescheduleResult(null);
    
    // 模拟AI重排过程
    setTimeout(() => {
      setIsRescheduling(false);
      setRescheduleResult('增量重排完成：已锁定炉次保持不变，未执行炉次已重新优化，时序连续无断流');
    }, 2000);
  };

  const lockedHeats = heatPlans.filter(h => h.status === 'locked');
  const plannedHeats = heatPlans.filter(h => h.status === 'planned');

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">计划调整与重排</h1>
          <p className="text-gray-500 mt-1">动态增量重排，适配现场波动，保障连续生产</p>
        </div>
      </div>

      {/* 核心特性说明 */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-orange-800 mb-2">🔥 增量重排核心逻辑（已执行锁定不动）</h3>
        <div className="grid grid-cols-3 gap-2 text-sm text-orange-700">
          <span>✓ 已执行炉次（H001, H003, H005）自动锁定</span>
          <span>✓ 仅重排未执行炉次</span>
          <span>✓ 保持连续生产不断流</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：未排产订单池 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-3">待排产订单池</h3>
          <p className="text-sm text-gray-500 mb-3">可拖拽添加到炉次</p>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {orders.map((order) => (
              <div key={order.id} draggable className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.steelGrade} · {order.weight}吨</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    order.priority === 'high' ? 'bg-red-100 text-red-700' :
                    order.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {order.priority === 'high' ? '紧急' : order.priority === 'medium' ? '普通' : '低'}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  <span>交期: {order.deliveryDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 中间：炉次列表（可调整） */}
        <div className="col-span-2 space-y-4">
          {/* 增量重排按钮 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">炉次计划调整</h3>
              <button
                onClick={handleReschedule}
                disabled={isRescheduling}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isRescheduling ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    AI 重排中...
                  </>
                ) : (
                  <>
                    <RefreshCw size={18} />
                    增量重排
                  </>
                )}
              </button>
            </div>

            {/* 重排结果提示 */}
            {rescheduleResult && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
                <CheckCircle size={16} />
                {rescheduleResult}
              </div>
            )}

            {/* 已锁定炉次 */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                <Lock size={14} className="text-orange-500" />
                已锁定炉次（不可调整）
              </h4>
              <div className="space-y-2">
                {lockedHeats.map((heat) => (
                  <div key={heat.heatId} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-800">{heat.heatId}</p>
                        <p className="text-xs text-gray-500">{heat.furnaceId} · {heat.steelGrade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{heat.startTime.split(' ')[1]} - {heat.endTime.split(' ')[1]}</p>
                      <p className="text-xs text-orange-600">已投产，不可调整</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 可调整炉次 */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                <Clock size={14} className="text-blue-500" />
                待执行炉次（可调整）
              </h4>
              <div className="space-y-2">
                {plannedHeats.map((heat, idx) => (
                  <div key={heat.heatId} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <ArrowUp size={14} className="text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <ArrowDown size={14} className="text-gray-400" />
                        </button>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{heat.heatId}</p>
                        <p className="text-xs text-gray-500">{heat.furnaceId} · {heat.steelGrade} · {heat.orders.length}个订单</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{heat.startTime.split(' ')[1]} - {heat.endTime.split(' ')[1]}</p>
                        <p className="text-xs text-gray-400">{heat.temperature}°C</p>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <XCircle size={18} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 异常事件处理 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">异常事件处理</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition text-left">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertTriangle size={18} />
                  <span className="font-medium">紧急插单</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">新增高优先级订单</p>
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition text-left">
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle size={18} />
                  <span className="font-medium">设备故障</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">指定炉窑不可用</p>
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition text-left">
                <div className="flex items-center gap-2 text-blue-600">
                  <Plus size={18} />
                  <span className="font-medium">原料变化</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">调整可用钢种</p>
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition text-left">
                <div className="flex items-center gap-2 text-purple-600">
                  <RefreshCw size={18} />
                  <span className="font-medium">工艺波动</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">调整温度/时间参数</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
