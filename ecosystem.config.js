module.exports = {
    apps: [
        {
            name      : "Frontend",
            script    : "npx",
            interpreter: "none",
            args: "serve -s build -p 80",
            env: {
              PORT: '80'
            },
            env_production: {
              PORT: '80'
            },
            env_homolog : {
              PORT: '80'
            }
          }, 
    ]
}