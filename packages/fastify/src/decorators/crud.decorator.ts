import { RouteOptions } from 'fastify';

import { Route } from './route';

export const GET =
  <T>(url?: string, options?: Partial<RouteOptions>) =>
  (target: T, memberName: string) =>
    Route({
      ...options,
      url,
      method: 'GET',
    })(target, memberName);

export const POST =
  <T>(url?: string, options?: Partial<RouteOptions>) =>
  (target: T, memberName: string) =>
    Route({
      ...options,
      url,
      method: 'POST',
    })(target, memberName);

export const DELETE =
  <T>(url?: string, options?: Partial<RouteOptions>) =>
  (target: T, memberName: string) =>
    Route({
      ...options,
      url,
      method: 'DELETE',
    })(target, memberName);

export const PUT =
  <T>(url?: string, options?: Partial<RouteOptions>) =>
  (target: T, memberName: string) =>
    Route({
      ...options,
      url,
      method: 'PUT',
    })(target, memberName);
