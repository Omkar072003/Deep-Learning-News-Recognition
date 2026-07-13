#!/bin/bash
echo "Building frontend and backend..."
cd ../backend && npm run build
cd ../frontend && npm run build
echo "Build completed!"