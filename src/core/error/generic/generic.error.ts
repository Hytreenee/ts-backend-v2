import type { TObjectUnknown } from '../../../general.type';

class GenericError extends Error {
  public description: string;

  public errorTimestamp: number;

  public errorTimestampHr: Date;

  public miscellaneous?: TObjectUnknown;

  constructor(message: string, miscellaneous?: TObjectUnknown) {
    super(message);

    this.name = 'GenericError';
    this.description = 'Generic error';
    this.miscellaneous = miscellaneous;

    this.errorTimestampHr = new Date();
    this.errorTimestamp = this.errorTimestampHr.getTime();

    // Monkey patch to use when transpiling to es5 to preserve Error class name
    // Object.setPrototypeOf(this, new.target.prototype);
  }

  public static getFormatted(error: Readonly<Error | GenericError>, oneLine = false): string {
    const parsed = {
      message: error.message,
      stack:
        error.stack !== undefined ? (oneLine ? error.stack.split('\n').join('') : error.stack) : '',
      miscellaneous: JSON.stringify(error, undefined, oneLine ? 0 : 2),
    };

    let formatted = '';

    Object.entries(parsed).forEach(([key, val]) => {
      formatted += `${key}: ${val}${oneLine ? '<*>' : '\n'}`;
    });

    // to cut last '\n'
    formatted = formatted.slice(0, -1);

    return formatted;
  }
}

export { GenericError };
