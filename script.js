let carrinho = [];

function adicionarItem() {
    const nomeInput = document.getElementById('nomeProduto');
    const qtdInput = document.getElementById('qtdProduto');
    const precoInput = document.getElementById('precoProduto');

    const nome = nomeInput.value.trim();
    const quantidade = parseInt(qtdInput.value);
    const preco = parseFloat(precoInput.value);

    if (!nome || isNaN(quantidade) || quantidade <= 0 || isNaN(preco) || preco < 0) {
        alert('Por favor, preencha o nome, quantidade e preço corretamente.');
        return;
    }

    const item = {
        id: Date.now(),
        nome,
        quantidade,
        preco,
        subtotal: quantidade * preco
    };

    carrinho.push(item);
    atualizarTela();

    // Limpa os campos
    nomeInput.value = '';
    qtdInput.value = '1';
    precoInput.value = '';
    nomeInput.focus();
}

function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarTela();
}

function limparLista() {
    carrinho = [];
    atualizarTela();
}

function atualizarTela() {
    const listaItens = document.getElementById('listaItens');
    const valorTotalEl = document.getElementById('valorTotal');

    listaItens.innerHTML = '';
    let totalGeral = 0;

    carrinho.forEach(item => {
        totalGeral += item.subtotal;

        const li = document.createElement('li');
        li.innerHTML = `
      <span>${item.quantidade}x ${item.nome} - R$ ${item.subtotal.toFixed(2).replace('.', ',')}</span>
      <button class="btn-remover" onclick="removerItem(${item.id})">X</button>
    `;
        listaItens.appendChild(li);
    });

    valorTotalEl.textContent = totalGeral.toFixed(2).replace('.', ',');
}
