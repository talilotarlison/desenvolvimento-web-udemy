%pip install transformers[torch] torchvision accelerate

# from huggingface_hub import login

# Faça login com seu token de acesso
# login(token="SEU_TOKEN_AQUI")


from transformers import AutoModel , AutoTokenizer

# Fornecendo o token diretamente para download
model = AutoModel.from_pretrained(
    "unsloth/gemma-3-1b-it", 
    use_auth_token="SEU_TOKEN_AQUI"
)

tokenizer = AutoTokenizer.from_pretrained(
    "unsloth/gemma-3-1b-it",
    use_auth_token="SEU_TOKEN_AQUI",
    force_download=True
)


from transformers import pipeline

# Carregar o pipeline de geração de texto com DistilGPT-2
generator = pipeline(task="text-generation", model="unsloth/gemma-3-1b-it", device=0)  # Usando CUDA

# Definir o prompt mais específico
prompt = "Quem descobriu a america?"

# Gerar a resposta com ajustes de parâmetros
output = generator(
    prompt,
    max_length=300,     # Limitar o comprimento da resposta para dar mais contexto
    temperature=0.3,    # Menor temperatura para garantir mais coerência
    top_k=40,           # Ajuste para um espaço de amostra mais restrito
    top_p=0.85,         # Nucleus sampling com maior controle
    truncation=True     # Garantir que o texto não ultrapasse o limite de tokens
)

# Exibir a resposta gerada
generated_text = output[0]['generated_text']
print(generated_text)
