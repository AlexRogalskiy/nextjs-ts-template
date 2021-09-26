class InternalError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export default InternalError;
