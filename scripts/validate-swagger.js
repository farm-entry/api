#!/usr/bin/env node

import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
  
  console.log('✅ Swagger specification loaded successfully!');
  console.log(`📊 API Title: ${swaggerDocument.info.title}`);
  console.log(`📝 Description: ${swaggerDocument.info.description?.split('\n')[0]}...`);
  console.log(`🔢 Version: ${swaggerDocument.info.version}`);
  console.log(`🛣️  Total paths: ${Object.keys(swaggerDocument.paths).length}`);
  console.log(`📚 Total schemas: ${Object.keys(swaggerDocument.components.schemas).length}`);
  
  console.log('\n📍 Available endpoints:');
  Object.entries(swaggerDocument.paths).forEach(([path, methods]) => {
    Object.keys(methods).forEach(method => {
      const operation = methods[method];
      console.log(`  ${method.toUpperCase()} ${path} - ${operation.summary}`);
    });
  });
  
  console.log('\n🚀 API Documentation will be available at:');
  console.log('   http://localhost:3000/api-docs');
  console.log('   http://localhost:3000/api-docs.json (raw JSON)');
  
} catch (error) {
  console.error('❌ Error loading Swagger specification:', error.message);
  process.exit(1);
}
