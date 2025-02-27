export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface FinancialData {
  availableFunds: number;
  totalExpenses: number;
  expensesDetails: ExpensesDetails[];
  spendingGoals: SpendingGoal[];
}

export interface ExpensesDetails {
  id: string;
  name: string
  icon?: string | null
  percentage: number
}

export interface SpendingGoal {
  id: string;
  category: string;
  iconName: string;
  current: number;
  target: number;
  warning?: string;
}

export interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface LoginScreenProps {
  onLogin: () => void;
  navigation: any;
}

export interface HomeScreenProps {
  user: User;
  financialData: FinancialData;
  navigation: any;
  route: any;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
}

export interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
}

export interface SocialButtonProps {
  icon: string;
  onPress: () => void;
}
