import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.less';
import Promise from './promise';

const Root = () => {
	useEffect(() => {
		class objImpl<T extends object, K extends keyof T> {
			public object!: T;
			public key!: K;

			constructor(_object: T, _key: K) {
				this.object = _object;
				this.key = _key;
			}

			get(): T[K] {
				return this.object[this.key];
			}

			set(value: T[K]) {
				this.object[this.key] = value;
			}
		}

		type o = {
			name: string,
			age: number
		}
		const name = new objImpl<o, 'name'>({name: 'zzw', age: 27}, 'name');
		name.set('shz')
		console.log(name.get());

	}, []);

	return (
		<div className={'rootWrapper'}>
			<App/>
		</div>
	);
};

ReactDOM.render(<Root/>, document.getElementById('root'));
