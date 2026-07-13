#!/bin/bash
echo "Installing backend and frontend dependencies..."
cd ../backend && npm install
cd ../frontend && npm install
echo "Dependencies installed successfully!"