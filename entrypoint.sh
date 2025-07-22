echo "Esperando o banco de dados inicializar..."
# Espera o banco ficar disponível antes de prosseguir
sleep 10

echo "Executando migrações Prisma..."
npx prisma migrate deploy

echo "Iniciando a aplicação..."
exec npm start