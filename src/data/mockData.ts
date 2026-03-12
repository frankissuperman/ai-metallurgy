// 模拟数据 - 订单管理
export interface Order {
  id: string;
  steelGrade: string;
  weight: number;
  deliveryDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'scheduled' | 'completed';
  compatibilityScore: number;
  dueDays: number;
  isStandardProduct: boolean;
  orderType: 'custom' | 'standard';
}

// 标准品清单
export interface StandardProduct {
  id: string;
  steelGrade: string;
  specification: string;
  stockWeight: number;
  minStock: number;
  price: number;
}

export const mockStandardProducts: StandardProduct[] = [
  { id: 'SP-001', steelGrade: 'Q235', specification: 'Φ16mm螺纹钢', stockWeight: 800, minStock: 500, price: 3800 },
  { id: 'SP-002', steelGrade: 'Q235', specification: 'Φ20mm螺纹钢', stockWeight: 650, minStock: 400, price: 3750 },
  { id: 'SP-003', steelGrade: 'Q345', specification: 'Φ25mm螺纹钢', stockWeight: 420, minStock: 300, price: 4100 },
  { id: 'SP-004', steelGrade: '304', specification: 'Φ50mm圆钢', stockWeight: 180, minStock: 100, price: 18000 },
  { id: 'SP-005', steelGrade: 'Q235', specification: '热轧板卷', stockWeight: 1200, minStock: 800, price: 3600 },
  { id: 'SP-006', steelGrade: 'Q345', specification: 'Φ18mm螺纹钢', stockWeight: 380, minStock: 350, price: 4050 },
  { id: 'SP-007', steelGrade: '316L', specification: 'Φ30mm圆钢', stockWeight: 95, minStock: 80, price: 22000 },
  { id: 'SP-008', steelGrade: 'Q235', specification: '冷轧带钢', stockWeight: 520, minStock: 400, price: 4200 },
];

// 扩充订单数据（多天、多订单）
export const mockOrders: Order[] = [
  // 3月12日 当天订单
  { id: 'ORD-001', steelGrade: 'Q235', weight: 120, deliveryDate: '2026-03-12', priority: 'high', status: 'pending', compatibilityScore: 95, dueDays: 0, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-002', steelGrade: 'Q345', weight: 85, deliveryDate: '2026-03-12', priority: 'high', status: 'pending', compatibilityScore: 88, dueDays: 0, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-003', steelGrade: 'Q235', weight: 95, deliveryDate: '2026-03-12', priority: 'medium', status: 'pending', compatibilityScore: 92, dueDays: 0, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-004', steelGrade: '304', weight: 60, deliveryDate: '2026-03-12', priority: 'high', status: 'pending', compatibilityScore: 78, dueDays: 0, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-005', steelGrade: 'Q345', weight: 110, deliveryDate: '2026-03-12', priority: 'medium', status: 'pending', compatibilityScore: 90, dueDays: 0, isStandardProduct: false, orderType: 'custom' },
  // 3月13日 订单
  { id: 'ORD-006', steelGrade: 'Q235', weight: 100, deliveryDate: '2026-03-13', priority: 'medium', status: 'pending', compatibilityScore: 94, dueDays: 1, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-007', steelGrade: '316L', weight: 75, deliveryDate: '2026-03-13', priority: 'medium', status: 'pending', compatibilityScore: 72, dueDays: 1, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-008', steelGrade: 'Q345', weight: 90, deliveryDate: '2026-03-13', priority: 'high', status: 'pending', compatibilityScore: 89, dueDays: 1, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-009', steelGrade: 'Q235', weight: 105, deliveryDate: '2026-03-13', priority: 'medium', status: 'pending', compatibilityScore: 93, dueDays: 1, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-010', steelGrade: '304', weight: 55, deliveryDate: '2026-03-13', priority: 'low', status: 'pending', compatibilityScore: 80, dueDays: 1, isStandardProduct: false, orderType: 'custom' },
  // 3月14日 订单
  { id: 'ORD-011', steelGrade: 'Q235', weight: 115, deliveryDate: '2026-03-14', priority: 'high', status: 'pending', compatibilityScore: 96, dueDays: 2, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-012', steelGrade: 'Q345', weight: 80, deliveryDate: '2026-03-14', priority: 'medium', status: 'pending', compatibilityScore: 87, dueDays: 2, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-013', steelGrade: '304', weight: 70, deliveryDate: '2026-03-14', priority: 'high', status: 'pending', compatibilityScore: 75, dueDays: 2, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-014', steelGrade: 'Q235', weight: 98, deliveryDate: '2026-03-14', priority: 'low', status: 'pending', compatibilityScore: 91, dueDays: 2, isStandardProduct: false, orderType: 'custom' },
  // 3月15日 订单
  { id: 'ORD-015', steelGrade: 'Q345', weight: 125, deliveryDate: '2026-03-15', priority: 'high', status: 'pending', compatibilityScore: 89, dueDays: 3, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-016', steelGrade: '316L', weight: 65, deliveryDate: '2026-03-15', priority: 'medium', status: 'pending', compatibilityScore: 70, dueDays: 3, isStandardProduct: false, orderType: 'custom' },
  { id: 'ORD-017', steelGrade: 'Q235', weight: 88, deliveryDate: '2026-03-15', priority: 'medium', status: 'pending', compatibilityScore: 94, dueDays: 3, isStandardProduct: false, orderType: 'custom' },
  // 标准品订单（填充用）
  { id: 'ORD-018', steelGrade: 'Q235', weight: 100, deliveryDate: '-', priority: 'low', status: 'pending', compatibilityScore: 100, dueDays: 0, isStandardProduct: true, orderType: 'standard' },
  { id: 'ORD-019', steelGrade: 'Q345', weight: 85, deliveryDate: '-', priority: 'low', status: 'pending', compatibilityScore: 100, dueDays: 0, isStandardProduct: true, orderType: 'standard' },
  { id: 'ORD-020', steelGrade: '304', weight: 60, deliveryDate: '-', priority: 'low', status: 'pending', compatibilityScore: 100, dueDays: 0, isStandardProduct: true, orderType: 'standard' },
  { id: 'ORD-021', steelGrade: 'Q235', weight: 95, deliveryDate: '-', priority: 'low', status: 'pending', compatibilityScore: 100, dueDays: 0, isStandardProduct: true, orderType: 'standard' },
  { id: 'ORD-022', steelGrade: '316L', weight: 70, deliveryDate: '-', priority: 'low', status: 'pending', compatibilityScore: 100, dueDays: 0, isStandardProduct: true, orderType: 'standard' },
];

// 钢种兼容性分组
export const steelGradeGroups: Record<string, string[]> = {
  '碳钢组': ['Q235', 'Q345', 'Q460'],
  '不锈钢组': ['304', '316L', '321'],
  '合金钢组': ['40Cr', '42CrMo', '35CrMo'],
};

// 生产条件配置 - 扩充设备（4台转炉+2台电炉）
export interface ProductionConfig {
  furnaceId: string;
  furnaceName: string;
  minCapacity: number;
  maxCapacity: number;
  status: 'available' | 'maintenance' | 'running';
  furnaceAge: number;
  steelGrades: string[];
  location: string;
}

export const mockFurnaces: ProductionConfig[] = [
  { furnaceId: 'F001', furnaceName: '1号转炉', minCapacity: 60, maxCapacity: 150, status: 'running', furnaceAge: 120, steelGrades: ['Q235', 'Q345', 'Q460'], location: 'A区1列' },
  { furnaceId: 'F002', furnaceName: '2号转炉', minCapacity: 60, maxCapacity: 150, status: 'available', furnaceAge: 85, steelGrades: ['Q235', 'Q345', 'Q460'], location: 'A区1列' },
  { furnaceId: 'F003', furnaceName: '3号转炉', minCapacity: 60, maxCapacity: 150, status: 'available', furnaceAge: 200, steelGrades: ['Q235', 'Q345', 'Q460'], location: 'A区2列' },
  { furnaceId: 'F004', furnaceName: '4号转炉', minCapacity: 60, maxCapacity: 150, status: 'maintenance', furnaceAge: 310, steelGrades: ['Q235', 'Q345'], location: 'A区2列' },
  { furnaceId: 'F005', furnaceName: '1号电炉', minCapacity: 40, maxCapacity: 100, status: 'running', furnaceAge: 150, steelGrades: ['304', '316L', '321'], location: 'B区1列' },
  { furnaceId: 'F006', furnaceName: '2号电炉', minCapacity: 40, maxCapacity: 100, status: 'available', furnaceAge: 90, steelGrades: ['304', '316L', '321'], location: 'B区1列' },
];

// 炉次计划 - 24小时排程（真正无缝衔接）
export interface HeatPlan {
  heatId: string;
  furnaceId: string;
  steelGrade: string;
  orders: string[];
  startTime: string;
  endTime: string;
  status: 'planned' | 'running' | 'completed' | 'locked';
  temperature: number;
  hasStandardProduct: boolean;
  standardWeight: number;
}

export const mockHeatPlans: HeatPlan[] = [
  // 3月12日 夜班(00:00-08:00) - 每台炉子连续作业
  // F001 转炉
  { heatId: 'H001', furnaceId: 'F001', steelGrade: 'Q235', orders: ['ORD-001', 'ORD-018'], startTime: '2026-03-12 00:00', endTime: '2026-03-12 02:00', status: 'completed', temperature: 1650, hasStandardProduct: true, standardWeight: 100 },
  { heatId: 'H002', furnaceId: 'F001', steelGrade: 'Q235', orders: ['ORD-003', 'ORD-021'], startTime: '2026-03-12 02:00', endTime: '2026-03-12 04:00', status: 'completed', temperature: 1630, hasStandardProduct: true, standardWeight: 95 },
  { heatId: 'H003', furnaceId: 'F001', steelGrade: 'Q345', orders: ['ORD-005'], startTime: '2026-03-12 04:00', endTime: '2026-03-12 06:00', status: 'completed', temperature: 1640, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H004', furnaceId: 'F001', steelGrade: 'Q235', orders: ['ORD-006'], startTime: '2026-03-12 06:00', endTime: '2026-03-12 08:00', status: 'locked', temperature: 1625, hasStandardProduct: false, standardWeight: 0 },
  // F002 转炉
  { heatId: 'H005', furnaceId: 'F002', steelGrade: 'Q345', orders: ['ORD-002', 'ORD-019'], startTime: '2026-03-12 00:30', endTime: '2026-03-12 02:30', status: 'completed', temperature: 1645, hasStandardProduct: true, standardWeight: 85 },
  { heatId: 'H006', furnaceId: 'F002', steelGrade: 'Q345', orders: ['ORD-008', 'ORD-012'], startTime: '2026-03-12 02:30', endTime: '2026-03-12 04:30', status: 'completed', temperature: 1635, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H007', furnaceId: 'F002', steelGrade: '304', orders: ['ORD-004', 'ORD-020'], startTime: '2026-03-12 04:30', endTime: '2026-03-12 06:30', status: 'completed', temperature: 1680, hasStandardProduct: true, standardWeight: 60 },
  { heatId: 'H008', furnaceId: 'F002', steelGrade: '316L', orders: ['ORD-007', 'ORD-022'], startTime: '2026-03-12 06:30', endTime: '2026-03-12 08:00', status: 'locked', temperature: 1670, hasStandardProduct: true, standardWeight: 70 },
  // F005 电炉 (不锈钢专线)
  { heatId: 'H009', furnaceId: 'F005', steelGrade: '304', orders: ['ORD-010'], startTime: '2026-03-12 00:00', endTime: '2026-03-12 02:00', status: 'completed', temperature: 1690, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H010', furnaceId: 'F005', steelGrade: '304', orders: ['ORD-013'], startTime: '2026-03-12 02:00', endTime: '2026-03-12 04:00', status: 'completed', temperature: 1685, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H011', furnaceId: 'F005', steelGrade: '316L', orders: ['ORD-016'], startTime: '2026-03-12 04:00', endTime: '2026-03-12 06:00', status: 'completed', temperature: 1675, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H012', furnaceId: 'F005', steelGrade: '316L', orders: ['ORD-017'], startTime: '2026-03-12 06:00', endTime: '2026-03-12 08:00', status: 'running', temperature: 1665, hasStandardProduct: false, standardWeight: 0 },
  
  // 3月12日 白班(08:00-16:00) - 无缝衔接
  // F001 转炉
  { heatId: 'H013', furnaceId: 'F001', steelGrade: 'Q235', orders: ['ORD-009'], startTime: '2026-03-12 08:00', endTime: '2026-03-12 10:00', status: 'planned', temperature: 1650, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H014', furnaceId: 'F001', steelGrade: 'Q345', orders: ['ORD-011'], startTime: '2026-03-12 10:00', endTime: '2026-03-12 12:00', status: 'planned', temperature: 1645, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H015', furnaceId: 'F001', steelGrade: 'Q235', orders: ['ORD-014'], startTime: '2026-03-12 12:00', endTime: '2026-03-12 14:00', status: 'planned', temperature: 1635, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H016', furnaceId: 'F001', steelGrade: 'Q345', orders: ['ORD-015'], startTime: '2026-03-12 14:00', endTime: '2026-03-12 16:00', status: 'planned', temperature: 1640, hasStandardProduct: false, standardWeight: 0 },
  // F002 转炉
  { heatId: 'H017', furnaceId: 'F002', steelGrade: 'Q345', orders: ['ORD-008'], startTime: '2026-03-12 08:00', endTime: '2026-03-12 10:00', status: 'planned', temperature: 1630, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H018', furnaceId: 'F002', steelGrade: 'Q235', orders: ['ORD-011'], startTime: '2026-03-12 10:00', endTime: '2026-03-12 12:00', status: 'planned', temperature: 1625, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H019', furnaceId: 'F002', steelGrade: '304', orders: ['ORD-013'], startTime: '2026-03-12 12:00', endTime: '2026-03-12 14:00', status: 'planned', temperature: 1680, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H020', furnaceId: 'F002', steelGrade: '316L', orders: [], startTime: '2026-03-12 14:00', endTime: '2026-03-12 16:00', status: 'planned', temperature: 1670, hasStandardProduct: true, standardWeight: 80 },
  // F005 电炉
  { heatId: 'H021', furnaceId: 'F005', steelGrade: '304', orders: ['ORD-010'], startTime: '2026-03-12 08:00', endTime: '2026-03-12 10:00', status: 'planned', temperature: 1690, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H022', furnaceId: 'F005', steelGrade: '304', orders: [], startTime: '2026-03-12 10:00', endTime: '2026-03-12 12:00', status: 'planned', temperature: 1685, hasStandardProduct: true, standardWeight: 50 },
  { heatId: 'H023', furnaceId: 'F005', steelGrade: '316L', orders: ['ORD-016'], startTime: '2026-03-12 12:00', endTime: '2026-03-12 14:00', status: 'planned', temperature: 1675, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H024', furnaceId: 'F005', steelGrade: '316L', orders: [], startTime: '2026-03-12 14:00', endTime: '2026-03-12 16:00', status: 'planned', temperature: 1665, hasStandardProduct: true, standardWeight: 65 },

  // 3月12日 晚班(16:00-24:00) - 无缝衔接
  // F001 转炉
  { heatId: 'H025', furnaceId: 'F001', steelGrade: 'Q235', orders: [], startTime: '2026-03-12 16:00', endTime: '2026-03-12 18:00', status: 'planned', temperature: 1650, hasStandardProduct: true, standardWeight: 90 },
  { heatId: 'H026', furnaceId: 'F001', steelGrade: 'Q345', orders: [], startTime: '2026-03-12 18:00', endTime: '2026-03-12 20:00', status: 'planned', temperature: 1645, hasStandardProduct: true, standardWeight: 85 },
  { heatId: 'H027', furnaceId: 'F001', steelGrade: 'Q235', orders: [], startTime: '2026-03-12 20:00', endTime: '2026-03-12 22:00', status: 'planned', temperature: 1635, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H028', furnaceId: 'F001', steelGrade: 'Q345', orders: [], startTime: '2026-03-12 22:00', endTime: '2026-03-13 00:00', status: 'planned', temperature: 1640, hasStandardProduct: false, standardWeight: 0 },
  // F002 转炉
  { heatId: 'H029', furnaceId: 'F002', steelGrade: '304', orders: [], startTime: '2026-03-12 16:00', endTime: '2026-03-12 18:00', status: 'planned', temperature: 1680, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H030', furnaceId: 'F002', steelGrade: '316L', orders: [], startTime: '2026-03-12 18:00', endTime: '2026-03-12 20:00', status: 'planned', temperature: 1670, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H031', furnaceId: 'F002', steelGrade: 'Q235', orders: [], startTime: '2026-03-12 20:00', endTime: '2026-03-12 22:00', status: 'planned', temperature: 1625, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H032', furnaceId: 'F002', steelGrade: 'Q345', orders: [], startTime: '2026-03-12 22:00', endTime: '2026-03-13 00:00', status: 'planned', temperature: 1635, hasStandardProduct: false, standardWeight: 0 },
  // F005 电炉
  { heatId: 'H033', furnaceId: 'F005', steelGrade: '304', orders: [], startTime: '2026-03-12 16:00', endTime: '2026-03-12 18:00', status: 'planned', temperature: 1690, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H034', furnaceId: 'F005', steelGrade: '304', orders: [], startTime: '2026-03-12 18:00', endTime: '2026-03-12 20:00', status: 'planned', temperature: 1685, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H035', furnaceId: 'F005', steelGrade: '316L', orders: [], startTime: '2026-03-12 20:00', endTime: '2026-03-12 22:00', status: 'planned', temperature: 1675, hasStandardProduct: false, standardWeight: 0 },
  { heatId: 'H036', furnaceId: 'F005', steelGrade: '316L', orders: [], startTime: '2026-03-12 22:00', endTime: '2026-03-13 00:00', status: 'planned', temperature: 1665, hasStandardProduct: false, standardWeight: 0 },
];

// 原材料库存 - 扩充
export interface Material {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  minStock: number;
  price: number;
  usedInGrades: string[];
}

export const mockMaterials: Material[] = [
  { id: 'MAT-001', name: '铁矿石', category: '矿石', stock: 5000, unit: '吨', minStock: 1000, price: 800, usedInGrades: ['Q235', 'Q345', 'Q460'] },
  { id: 'MAT-002', name: '废钢', category: '回收料', stock: 1200, unit: '吨', minStock: 300, price: 2500, usedInGrades: ['Q235', 'Q345'] },
  { id: 'MAT-003', name: '镍板', category: '合金', stock: 45, unit: '吨', minStock: 10, price: 150000, usedInGrades: ['304', '316L'] },
  { id: 'MAT-004', name: '铬铁', category: '合金', stock: 80, unit: '吨', minStock: 20, price: 85000, usedInGrades: ['304', '316L', '321'] },
  { id: 'MAT-005', name: '锰硅', category: '合金', stock: 150, unit: '吨', minStock: 30, price: 12000, usedInGrades: ['Q235', 'Q345', '40Cr'] },
  { id: 'MAT-006', name: '钼铁', category: '合金', stock: 8, unit: '吨', minStock: 5, price: 280000, usedInGrades: ['42CrMo', '35CrMo'] },
  { id: 'MAT-007', name: '石灰石', category: '辅料', stock: 3500, unit: '吨', minStock: 800, price: 350, usedInGrades: ['Q235', 'Q345', 'Q460', '304'] },
  { id: 'MAT-008', name: '萤石', category: '辅料', stock: 180, unit: '吨', minStock: 50, price: 2800, usedInGrades: ['Q235', 'Q345', '304'] },
];

// 原材料约束检查结果
export interface MaterialCheck {
  materialId: string;
  materialName: string;
  required: number;
  available: number;
  sufficient: boolean;
  grade: string;
}

export const mockMaterialChecks: MaterialCheck[] = [
  { materialId: 'MAT-001', materialName: '铁矿石', required: 850, available: 5000, sufficient: true, grade: 'Q235/Q345' },
  { materialId: 'MAT-002', materialName: '废钢', required: 320, available: 1200, sufficient: true, grade: 'Q235/Q345' },
  { materialId: 'MAT-004', materialName: '铬铁', required: 45, available: 80, sufficient: true, grade: '304/316L' },
  { materialId: 'MAT-003', materialName: '镍板', required: 8, available: 45, sufficient: true, grade: '304/316L' },
  { materialId: 'MAT-005', materialName: '锰硅', required: 65, available: 150, sufficient: true, grade: '碳钢/合金钢' },
  { materialId: 'MAT-007', materialName: '石灰石', required: 420, available: 3500, sufficient: true, grade: '全钢种' },
];

// 冲突检测结果
export interface ConflictCheck {
  type: 'time' | 'capacity' | 'steelGrade' | 'delivery' | 'flow';
  severity: 'error' | 'warning' | 'info';
  message: string;
  heatId?: string;
}

export const mockConflicts: ConflictCheck[] = [
  { type: 'delivery', severity: 'warning', message: 'ORD-001 交期紧张，优先排产', heatId: 'H001' },
  { type: 'delivery', severity: 'warning', message: 'ORD-004、ORD-013 不锈钢订单交期紧张', heatId: 'H003' },
  { type: 'steelGrade', severity: 'info', message: 'Q235与Q345可同炉组产，兼容性得分92', heatId: 'H004' },
  { type: 'flow', severity: 'info', message: '连续生产时序正常，无断流风险' },
  { type: 'flow', severity: 'info', message: 'F004号转炉维护中，预计3月14日08:00恢复' },
  { type: 'capacity', severity: 'info', message: '标准品填充优化炉容利用率，平均达92%' },
];

// 钢种颜色映射
export const steelGradeColors: Record<string, string> = {
  'Q235': '#3B82F6',
  'Q345': '#10B981',
  'Q460': '#8B5CF6',
  '304': '#F59E0B',
  '316L': '#EF4444',
  '321': '#EC4899',
  '40Cr': '#06B6D4',
  '42CrMo': '#84CC16',
  '35CrMo': '#F97316',
};
