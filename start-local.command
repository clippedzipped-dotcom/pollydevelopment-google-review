#!/bin/bash
# ==============================================================================
# PollyDevelopment Google Review NFC - 1-Click Local Launcher
# ==============================================================================
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "================================================================="
echo "  ⭐ POLLYDEVELOPMENT GOOGLE REVIEW NFC // LOCAL SERVER"
echo "  Stickers, Kaarten & Tafeldisplays 3D Showcase"
echo "================================================================="
echo ""
echo "Map: $DIR"
echo "Poort: http://localhost:3001"
echo ""

# Open browser after 2 seconds in background
(sleep 2 && open "http://localhost:3001") &

# Start dev server on port 3001
npm run dev
