import { useState } from 'react';
import { mockOrders, mockFurnaces, mockHeatPlans, mockConflicts, mockMaterialChecks, steelGradeColors, HeatPlan, ConflictCheck, MaterialCheck, Order } from '../data/mockData';
import { Play, CheckCircle, Lock, AlertTriangle, Clock, Zap, ArrowRight, Warehouse, Flame } from 'lucide-react';

// 定义 Furnace 类型
interface Furnace {
  furnaceId: string;
  furnaceName: string;
  minCapacity: number;
  maxCapacity: number;
  status: string;
  steelGrades: string[];
}

// API 配置 - 后端地址
const API_BASE = "http://localhost:8000";

export default function SchedulingPage() {
  const [heatPlans] = useState<HeatPlan[]>(mockHeatPlans);
  const [conflicts] = useState<ConflictCheck[]>(mockConflicts);
  const [materialChecks] = useState<MaterialCheck[]>(mockMaterialChecks);
  const [aiResult, setAiResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // 调用后端 AI 排产
  const handleAISchedule = async () => {
    const orders: Order[] = mockOrders;
    const furnaces: Furnace[] = mockFurnaces;
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders, furnaces }),
      });
      const result = await response.json();
      console.log("AI 排产结果:", result);
      setAiResult(result.ai_response || "排产完成");
      alert("AI 排产完成！");
    } catch (error) {
      console.error("排产失败:", error);
      alert("排产失败，请检查后端服务是否启动");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="text-green-500" size={16} />;
      case 'planned': return <Clock className="text-blue-500" size={16} />;
      case 'completed': return <CheckCircle className="text-gray-500" size={16} />;
      case 'locked': return <Lock className="text-orange-500" size={16} />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return '生产中';
      case 'planned': return '已排产';
      case 'completed': return '已完成';
      case 'locked': return '已锁定';
      default: return status;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="text-red-500" size={16} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'info': return <CheckCircle className="text-blue-500" size={16} />;
      default: return null;
    }
  };

  // 24小时甘特图
  const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  const furnaces = ['F001', 'F002', 'F005'];

  const nightShift = heatPlans.filter(h => {
    const hour = parseInt(h.startTime.split(' ')[1].split(':')[0]);
    return hour >= 0 && hour < 8;
  }).length;
  const dayShift = heatPlans.filter(h => {
    const hour = parseInt(h.startTime.split(' ')[1].split(':')[0]);
    return hour >= 8 && hour < 16;
  }).length;
  const eveningShift = heatPlans.filter(h => {
    const hour = parseInt(h.startTime.split(' ')[1].split(':')[0]);
    return hour >= 16 && hour < 24;
  }).length;

  const getPositionStyle = (startTime: string, endTime: string) => {
    const parseTime = (timeStr: string) => {
      const [date, time] = timeStr.split(' ');
      const [hour, min] = time.split(':').map(Number);
      return hour * 60 + min;
    };
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const leftPercent = (start / 1440) * 100;
    const widthPercent = ((end - start) / 1440) * 100;
    return { left: `${leftPercent}%`, width: `${widthPercent}%` };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">AI 排程结果</h1>
          <p className="text-gray-500 mt-1">24小时连续生产排程 · 2026年3月12日</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleAISchedule}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            <Zap size={18} />
            {isLoading ? 'AI 排产中...' : 'AI 重新排程'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <CheckCircle size={18} />
            确认计划
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">今日计划炉次</p>
          <p className="text-2xl font-bold text-gray-800">{heatPlans.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">覆盖订单</p>
          <p className="text-2xl font-bold text-gray-800">17</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">作业设备</p>
          <p className="text-2xl font-bold text-indigo-600">3台</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">白班(08-16)</p>
          <p className="text-2xl font-bold text-orange-600">{dayShift}炉</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">晚班(16-24)</p>
          <p className="text-2xl font-bold text-blue-600">{eveningShift}炉</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">连续生产</p>
          <p className="text-2xl font-bold text-green-600">100%</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">24小时连续生产时序图</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Flame size={14} className="text-orange-500" />
              <span>三班倒 · 24小时不停歇</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-4 text-sm">
            {Object.entries(steelGradeColors).slice(0, 5).map(([grade, color]) => (
              <div key={grade} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                <span>{grade}</span>
              </div>
            ))}
            <div className="flex items-center gap-1 ml-4">
              <div className="w-3 h-3 rounded bg-orange-400 ring-2 ring-orange-200"></div>
              <span>已锁定</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="flex mb-2 text-xs text-gray-400">
                <div className="flex-1 bg-indigo-50 py-1 text-center">夜班 00:00-08:00</div>
                <div className="flex-1 bg-orange-50 py-1 text-center">白班 08:00-16:00</div>
                <div className="flex-1 bg-blue-50 py-1 text-center">晚班 16:00-24:00</div>
              </div>

              <div className="flex border-b border-gray-200 pb-2 mb-2">
                <div className="w-16"></div>
                {hours.map((hour) => (
                  <div key={hour} className="flex-1 text-center text-xs text-gray-400">{hour}</div>
                ))}
              </div>

              {furnaces.map((furnaceId) => {
                const furnacePlans = heatPlans.filter(p => p.furnaceId === furnaceId);
                return (
                  <div key={furnaceId} className="flex items-center py-3 border-b border-gray-100">
                    <div className="w-16 font-medium text-gray-700 text-sm">{furnaceId}</div>
                    <div className="flex-1 relative h-12 bg-gray-50 rounded">
                      <div className="absolute inset-0 flex">
                        {hours.map((_, i) => (
                          <div key={i} className="flex-1 border-l border-gray-100" />
                        ))}
                      </div>
                      
                      {furnacePlans.map((plan) => {
                        const pos = getPositionStyle(plan.startTime, plan.endTime);
                        const color = steelGradeColors[plan.steelGrade] || '#6B7280';
                        
                        return (
                          <div
                            key={plan.heatId}
                            className={`absolute h-10 rounded flex items-center px-2 text-white text-xs cursor-pointer hover:opacity-80 transition ${
                              plan.status === 'locked' ? 'ring-2 ring-orange-400 ring-offset-1' : ''
                            } ${plan.status === 'running' ? 'ring-2 ring-green-400 ring-offset-1' : ''}`}
                            style={{
                              ...pos,
                              backgroundColor: color,
                              top: '4px'
                            }}
                          >
                            <span className="truncate font-medium">{plan.heatId}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2 text-green-700 text-sm">
            <ArrowRight size={16} />
            <span>连续生产状态：24小时无缝衔接，设备利用率100%，三班倒不停歇</span>
          </div>

          {aiResult && (
            <div className="mt-3 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🤖 AI 排产结果</h4>
              <pre className="text-xs text-blue-700 whitespace-pre-wrap overflow-auto max-h-40">
                {aiResult}
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">炉次详情 ({heatPlans.length}炉 · 24h连续)</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {heatPlans.slice(0, 18).map((plan) => (
                <div key={plan.heatId} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(plan.status)}
                    <div>
                      <p className="font-medium text-sm text-gray-800">{plan.heatId}</p>
                      <p className="text-xs text-gray-500">{plan.steelGrade} · {plan.orders.length}单</p>
                      {plan.hasStandardProduct && (
                        <span className="inline-flex items-center px-1 py-0.5 mt-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                          含标品
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{plan.startTime.split(' ')[1]}-{plan.endTime.split(' ')[1]}</p>
                    <p className="text-xs text-gray-400">{getStatusText(plan.status)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">冲突检测 · 预警</h3>
            <div className="space-y-2 mb-4">
              {conflicts.map((conflict, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50">
                  {getSeverityIcon(conflict.severity)}
                  <p className="text-sm text-gray-700">{conflict.message}</p>
                </div>
              ))}
            </div>
            
            <h4 className="font-medium text-gray-700 mb-2 text-sm">原材料约束检查</h4>
            <div className="space-y-1">
              {materialChecks.slice(0, 4).map((check, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-purple-50">
                  <div className="flex items-center gap-2">
                    {check.sufficient ? (
                      <CheckCircle className="text-green-500" size={14} />
                    ) : (
                      <AlertTriangle className="text-red-500" size={14} />
                    )}
                    <span className="text-sm text-gray-700">{check.materialName}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {check.required}t/{check.available}t
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}