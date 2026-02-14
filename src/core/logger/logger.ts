import { appConfig } from '../config/appConfig';

class Logger {
  private isEnabled(): boolean {
    return appConfig.enableLogging;
  }

  log(module: string, message: string, data?: any): void {
    if (!this.isEnabled()) return;
    console.log(`[${module}] ${message}`, data || '');
  }

  warn(module: string, message: string, data?: any): void {
    if (!this.isEnabled()) return;
    console.warn(`[${module}] ${message}`, data || '');
  }

  error(module: string, message: string, error?: any): void {
    if (!this.isEnabled()) return;
    console.error(`[${module}] ${message}`, error || '');
  }
}

export const logger = new Logger();
