/**
 * @name: index
 * @author: evil
 * @date: 2022-02-26 23:19
 * @description：index
 * @update: 2022-02-26 23:19
 */

import {ResolveType, RejectType, Executor, StatusType, isPromise} from './actionType';

class Promise<T = any> {
	private readonly resolve!: ResolveType;
	private readonly reject!: RejectType;
	private status!: StatusType;
	private resolveValue!: any;
	private rejectValue!: any;
	private resolveCallBackStack: (() => void)[] = [];
	private rejectCallBackStack
		: (() => void)[] = [];

	constructor(public executor: Executor) {
		this.status = 'pending';
		// this.resolveCallBackStack = [];
		// this.rejectCallBackStack = [];
		this.resolve = (value: any) => {
			if (this.status === 'pending') {
				this.status = 'resolve';
				this.resolveValue = value;
				this.resolveCallBackStack.forEach(callBack => callBack());
			}
		};
		this.reject = (error: any) => {
			if (this.status === 'pending') {
				this.status = 'reject';
				this.rejectValue = error;
				this.rejectCallBackStack.forEach(callBack => callBack());
			}
		};

		try {
			executor(this.resolve, this.reject);
		} catch (e) {
			this.status = 'pending';
			this.reject(e);
			throw new Error('');
		}
	}

	then(resolve_then: ResolveType, reject_then?: RejectType): Promise {
		return new Promise((resolve, reject) => {
			if (this.status === 'resolve') {
				const res = resolve_then(this.resolveValue);
				resolve(res);
			}
			if (this.status === 'reject') {
				const res = reject_then && reject_then(this.rejectValue);
				reject(res);
			}
			if (this.status === 'pending') {
				this.resolveCallBackStack.push(() => {
					const res = resolve_then(this.resolveValue);
					if (isPromise(res)) {
						res.then((value) => {
							resolve(value);
						}, (error) => {
							reject(error);
						});
					} else {
						resolve(res);
					}
				});
				reject_then && this.rejectCallBackStack.push(() => {
					const res = reject_then(this.rejectValue);
					reject(res);
				});
			}
		});
	}

	static all(promiseList: Array<Promise>) {
	}
}

export default Promise;
