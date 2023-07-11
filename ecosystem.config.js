module.exports = {
  apps: [
    {
      script: "./index.js",
      instances: "1",
      exec_mode: "cluster",
      name: "primary",
      env: {
        NODE_ENV: "development",
      },
      env_integration: {
        NODE_ENV: "integration",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      script: "./index.js",
      instances: "-1",
      exec_mode: "cluster",
      name: "replica",
      env: {
        NODE_ENV: "development",
      },
      env_integration: {
        NODE_ENV: "integration",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};