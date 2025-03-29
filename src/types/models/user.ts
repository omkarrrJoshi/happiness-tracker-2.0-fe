import store from "../../redux/store";

class UserService {
  private static instance: UserService;

  private constructor() {} // Prevent direct instantiation

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // ✅ Get full user object
  getUser() {
    return store.getState().auth.user;
  }

  // ✅ Get user ID
  getUserId(): string | null {
    return this.getUser()?.uid || null;
  }

  // ✅ Get user email
  getUserEmail(): string | null {
    return this.getUser()?.email || null;
  }

  // ✅ Get user display name
  getUserDisplayName(): string | null {
    return this.getUser()?.displayName || null;
  }
}

// Export singleton instance
export const userService = UserService.getInstance();
