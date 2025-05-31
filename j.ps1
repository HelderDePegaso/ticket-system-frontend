# Criação da estrutura de pastas
New-Item -ItemType Directory -Path "src\app\core" -Force
New-Item -ItemType Directory -Path "src\app\shared\components" -Force
New-Item -ItemType Directory -Path "src\app\entities\auth\components" -Force
New-Item -ItemType Directory -Path "src\app\entities\dashboard\components" -Force
#New-Item -ItemType Directory -Path "src\app\entities\profile\components" -Force


# Geração de componentes standalone
ng generate modules entities/auth/login 
ng generate modules entities/auth/register 
ng generate modules entities/dashboard/dashboard 

# Geração de componentes standalone
ng generate component entities/auth/login --standalone 
ng generate component entities/auth/register --standalone 
ng generate component entities/dashboard/dashboard --standalone 
#ng generate component entities/profile/profile --standalone --flat --skip-tests



# Criação de arquivos de rota (vazios inicialmente)
Set-Content -Path "src\app\entities\auth\auth.routes.ts" -Value "// auth.routes.ts"
Set-Content -Path "src\app\entities\dashboard\dashboard.routes.ts" -Value "// dashboard.routes.ts"
#Set-Content -Path "src\app\entities\profile\profile.routes.ts" -Value "// profile.routes.ts"

# Criar (ou sobrescrever) app.routes.ts
#Set-Content -Path "src\app\app.routes.ts" -Value "// app.routes.ts"
