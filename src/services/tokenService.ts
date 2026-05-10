// Mock Token service
interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  issuedAt: number;
}

class TokenService {
  private tokens: Map<string, Token> = new Map();

  generateToken(userId: string): Token {
    const token: Token = {
      accessToken: `access_${userId}_${Date.now()}`,
      refreshToken: `refresh_${userId}_${Date.now()}`,
      expiresIn: 3600,
      issuedAt: Date.now()
    };
    this.tokens.set(userId, token);
    return token;
  }

  getToken(userId: string): Token | null {
    return this.tokens.get(userId) || null;
  }

  validateToken(token: string): boolean {
    for (const [, storedToken] of this.tokens) {
      if (storedToken.accessToken === token) {
        const elapsedTime = (Date.now() - storedToken.issuedAt) / 1000;
        return elapsedTime < storedToken.expiresIn;
      }
    }
    return false;
  }

  refreshToken(refreshToken: string): Token | null {
    for (const [userId, storedToken] of this.tokens) {
      if (storedToken.refreshToken === refreshToken) {
        return this.generateToken(userId);
      }
    }
    return null;
  }

  revokeToken(userId: string): void {
    this.tokens.delete(userId);
  }
}

export const tokenService = new TokenService();
export default tokenService;
