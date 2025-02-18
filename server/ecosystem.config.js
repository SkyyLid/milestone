module.exports = { 
  apps: [
    {
      name: "milestone",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      }
    }
  ]
}