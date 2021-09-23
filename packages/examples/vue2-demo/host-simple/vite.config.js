import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    federation({
      name: 'remote-simple',
      filename: 'remoteEntry.js',
      remotes: {
        'remote-simple': 'http://localhost:5011/remoteEntry.js',
        'demo-simple': 'http://localhost:5012/remoteEntry.js'
      },
      shared: ['vue']
    })
  ],
  // Dependencies that are forcibly excluded in a pre-build
  optimizeDeps: {
    // ...
    // ץȡԤ���������������ڵ㣬ָ���Զ�����Ŀ������ֵ��Ҫ��ѭ fast-glob ģʽ ������������� vite ��Ŀ����ģʽ���顣�⽫���ǵ�Ĭ����Ŀ�ƶϡ�
    // �޷�ץȡԶ�����
    // entries: ['index.html','http://localhost:5011/remoteEntry.js'],
    // exclude: ['remote-simple'],
    // exclude: ['remote-simple/*'],
    // exclude: ['remote-simple', 'remote-simple/remote-simple-button','remote-simple/remote-simple-section'],
    exclude: ['exclude-simple']
  },
  server: {force: true},
  build: {
    target: 'es2020',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      // sharedPlugin need input required
      // input:{},
      output: {
        minifyInternalExports: false
      }
    }
  }
})
