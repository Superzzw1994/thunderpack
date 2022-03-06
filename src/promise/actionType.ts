/**
 * @name: actionType
 * @author: evil
 * @date: 2022-02-26 23:16
 * @description：actionType
 * @update: 2022-02-26 23:16
 */
import Promise from './index';

type ResolveType = (resolve: any) => any;
type RejectType = (reject: any) => any;
type Executor = (resolve: ResolveType, reject: RejectType) => any;
type StatusType = ('pending' | 'resolve' | 'reject')

function isObject(v: any): v is Record<any, any> {
	return v !== null && v instanceof Object;
}

function isFunction(v: any): v is Function {
	return v !== null && v instanceof Function;
}

function isPromise(v: any): v is Promise {
	return isObject(v) && isFunction(v.then);
}

export {RejectType, ResolveType, Executor, StatusType, isPromise};


