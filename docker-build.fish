#!/usr/bin/env fish

# ==============================================
# Docker Build Script for EONS Frontend
# ==============================================
# This script builds an optimized multi-stage Docker image
# with environment variables automatically loaded from .env file
#
# Usage:
#   ./docker-build.fish          # Uses .env for local/dev build
#   ./docker-build.fish production # TODO: Use .env.production
#
# The script reads ALL variables from .env and passes them as build args
# ==============================================

# Image configuration
set IMAGE_NAME "eons-front"
set IMAGE_TAG "latest"

echo "🚀 EONS Frontend - Docker Build"
echo "================================"
echo ""

# Collect build arguments from .env file
set build_args

echo "📋 Reading environment variables from .env..."
set var_count 0

for line in (cat .env)
    # Skip empty lines and comments
    if test -n "$line"; and not string match -q '#*' $line
        set -a build_args --build-arg $line
        set var_count (math $var_count + 1)
    end
end

echo "✓ Loaded $var_count environment variables"
echo ""

# Build the docker image with multi-stage optimization
echo "🐳 Building Docker image: $IMAGE_NAME:$IMAGE_TAG"
echo "================================"
echo "📦 Stage 1: Installing dependencies and building app..."
echo "📦 Stage 2: Creating minimal production image..."
echo ""

docker build $build_args -t $IMAGE_NAME:$IMAGE_TAG .

if test $status -eq 0
    echo ""
    echo "================================"
    echo "✅ Build completed successfully!"
    echo "================================"
    echo ""
    echo "📊 Image details:"
    docker images $IMAGE_NAME:$IMAGE_TAG --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
    echo ""
    echo "🚀 Run the container:"
    echo "   docker run -d -p 4321:4321 --name eons-front $IMAGE_NAME:$IMAGE_TAG"
    echo ""
    echo "🔍 Useful commands:"
    echo "   docker logs -f eons-front        # View logs"
    echo "   docker exec -it eons-front sh    # Access container shell"
    echo "   docker stop eons-front           # Stop container"
    echo "   docker rm eons-front             # Remove container"
    echo ""
else
    echo ""
    echo "================================"
    echo "❌ Build failed!"
    echo "================================"
    echo "Check the error messages above for details."
    exit 1
end
