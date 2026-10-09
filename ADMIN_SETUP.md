# Painel da Merena

O painel fica em `/admin`. Ele usa uma senha única definida nas variáveis de ambiente e permite editar nome, descrição e foto dos seis modelos.

## Conectar o Supabase

1. No projeto Supabase, abra o SQL Editor e execute `supabase/setup.sql`. Se você já tinha configurado o painel dos biquínis, execute o arquivo atualizado novamente para criar também a lista de fotos do cabeçalho e da vitrine. O script preserva os modelos existentes.
2. No projeto da Vercel, configure estas variáveis para Production e Preview:
   - `SUPABASE_URL`: URL do projeto Supabase.
   - `SUPABASE_SECRET_KEY`: chave privada do Supabase que começa com `sb_secret_`. Mantenha-a somente no servidor; não use o prefixo `NEXT_PUBLIC_`.
   - `ADMIN_PASSWORD`: senha que será entregue à cliente para acessar `/admin`.
   - `ADMIN_SESSION_SECRET`: valor aleatório longo usado para assinar a sessão do painel.
   - `SUPABASE_PRODUCT_BUCKET`: opcional; se não definido, o painel usa `merena-product-images`.
3. Faça um novo deploy na Vercel para aplicar as variáveis.
4. Acesse `https://www.merena.com.br/admin` e entre com `ADMIN_PASSWORD`.

Para testar localmente, copie `.env.example` para `.env.local` e preencha as mesmas variáveis. O `.env.local` está ignorado pelo Git e não deve ser enviado ao repositório.

O painel aceita imagens JPG, PNG ou WebP de até 5 MB. As fotos dos biquínis e das demais seções ficam no bucket público porque são exibidas no site; a chave privada continua somente nas rotas do servidor.
