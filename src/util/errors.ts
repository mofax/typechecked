export class TypeCheckedError extends TypeError {
    data?: Record<string, any>;
    constructor(message: string) {
        super(message);
    }
}
