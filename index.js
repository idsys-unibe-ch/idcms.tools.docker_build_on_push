import express from 'express'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as dotenv from "dotenv"

const app = express()
const port = 7777
dotenv.config()
const allowedServices = (process.env.ALLOWED_SERVICES?process.env.ALLOWED_SERVICES:"").trim().split(",") || []

// Promisify exec for cleaner async/await usage
const execAsync = promisify(exec)

/**
 * Helper function to run a command and return the output.
 * @param {string} command - The command to run.
 * @returns {Promise<string>} - The command output.
 */
async function runCommand(command) {
    try {
        const { stdout } = await execAsync(command)
        return stdout
    } catch (error) {
        return `Error: ${error.message}`
    }
}

// Endpoints
app.get('/ps', async (req, res) => {
    const output = await runCommand('docker ps')
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Disposition', 'inline')
    res.send(output)
});

app.get('/service_ls', async (req, res) => {
    const output = await runCommand('docker service ls')
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Disposition', 'inline')
    res.send(output)
})

app.get('/service_ps', async (req, res) => {
    const { name } = req.query
    if (!name) {
        res.status(400).send('Error: Query parameter "name" is required')
        return
    }
    if(!allowedServices.includes(name)){
        res.status(400).send('Error: You are not allowed to query this service')
        return
    }
    const output = await runCommand(`docker service ps ${name}`)
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Disposition', 'inline')
    res.send(output)
})

app.get('/node_ls', async (req, res) => {
    const output = await runCommand('docker node ls')
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Disposition', 'inline')
    res.send(output)
})

// Start server
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`)
})
