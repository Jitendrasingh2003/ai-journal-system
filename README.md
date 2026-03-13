# AI-Assisted Journal System

This project is an AI-powered journal system where users can write journal entries after immersive nature sessions and analyze their emotions using an LLM.

## Features

- Create journal entries
- Retrieve previous journal entries
- AI-based emotion analysis
- Insights API
- Rate limiting to prevent API abuse
- Minimal React frontend

## Tech Stack

Backend:
Node.js
Express

Frontend:
React

LLM:
Gemini API

## API Endpoints

POST /api/journal  
Create a journal entry

GET /api/journal/:userId  
Get all entries of a user

POST /api/journal/analyze  
Analyze emotions from journal text

GET /api/journal/insights/:userId  
Get user emotional insights

## Run Project

Backend

npm install  
node server.js  

Frontend

cd frontend  
npm install  
npm start
