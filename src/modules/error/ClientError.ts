class ClientError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ClientError';
  }
}

export default ClientError;
