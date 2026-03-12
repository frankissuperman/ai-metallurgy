// 前端 API 服务 - 连接后端
const API_BASE = "https://ai-scheduler-backend-cpwy.vercel.app/";

export interface Order {
  id: string;
  steelGrade: string;
  weight: number;
  deliveryDate: string;
  priority: string;
  orderType: string;
}

export interface Furnace {
  furnaceId: string;
  furnaceName: string;
  minCapacity: number;
  maxCapacity: number;
  status: string;
  steelGrades: string[];
}

export interface ScheduleResult {
  success: boolean;
  ai_response: string;
}

// 调用 AI 排产接口
export async function createSchedule(orders: Order[], furnaces: Furnace[]): Promise<ScheduleResult> {
  const response = await fetch(`${API_BASE}/api/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orders, furnaces }),
  });
  
  return response.json();
}

// 健康检查
export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`);
  return response.json();

}
