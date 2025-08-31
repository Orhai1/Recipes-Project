import morgan from 'morgan';

morgan.token('iso', () => new Date().toISOString());

export const logger = morgan(':method :url :status :res[content-length] - :response-time ms [:iso]');
