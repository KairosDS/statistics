import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    preserverSymlinks: true, 
    input: [ 'statistics.js' ], 
    output: {
        file: 'dist/statistics.js', 
        format: 'es', 
        sourcemap: true
    },
    plugins: [
        resolve(),
        babel(),
        terser()
    ]
};