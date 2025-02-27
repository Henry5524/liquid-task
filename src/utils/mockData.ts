import { User, FinancialData } from "../types";

export const mockUser: User = {
  id: "1",
  name: "John",
  email: "john@example.com",
  profileImage: require("../../src/assets/images/user.jpeg"),
};

export const mockFinancialData: FinancialData = {
  availableFunds: 3234,
  totalExpenses: 4325.17,
  spendingGoals: [
    {
      id: "1",
      category: "Food",
      iconName: "fast-food",
      current: 460,
      target: 500,
      warning: "You're almost out of budget!",
    },
    {
      id: "2",
      category: "Shopping",
      iconName: "cart",
      current: 320,
      target: 600,
    },
    {
      id: "3",
      category: "Transport",
      iconName: "car",
      current: 85,
      target: 200,
    },
  ],
  expensesDetails: [
    {
      id: "1",
      name: "Home",
      icon: "key-outline",
      percentage: 35,
    },
    {
      id: "2",
      name: "Shopping",
      icon: "cart-outline",
      percentage: 18,
    },
    {
      id: "3",
      name: "Food",
      icon: "fast-food-outline",
      percentage: 15,
    },
    {
      id: "4",
      name: "Travel",
      icon: "airplane-outline",
      percentage: 15,
    },
    { id: "5", name: "Work", icon: "briefcase-outline", percentage: 10 },
    {
      id: "6",
      name: "Other",
      icon: "ellipsis-horizontal",
      percentage: 7,
    },
  ],
};
