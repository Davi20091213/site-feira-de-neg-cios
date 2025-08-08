document.addEventListener('DOMContentLoaded', function() {
    // Preços dos churros
    const precos = {
       
        'Espanhol': 12.00,
        'Mini': 10.00
    };

    // Adicional para recheios gourmet
    const adicionalGourmet = 3.00;

    // Carrinho de compras
    let carrinho = [];

    // Elementos do DOM
    const btnAdicionar = document.getElementById('adicionar-carrinho');
    const btnFinalizar = document.getElementById('finalizar-pedido');
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');

    // Evento para adicionar item ao carrinho
    btnAdicionar.addEventListener('click', function() {
        // Verificar tipo de churros selecionado
        const tipoChurros = document.querySelector('input[name="tipo-churros"]:checked').value;
        
        // Obter recheios normais selecionados
        const recheiosNormais = [];
        document.querySelectorAll('input[name="recheio"]:checked').forEach(recheio => {
            recheiosNormais.push(recheio.value);
        });
        
        // Verificar se mais de 2 recheios normais foram selecionados
        if (recheiosNormais.length > 2) {
            alert('Você pode selecionar no máximo 2 recheios normais!');
            return;
        }
        
        // Obter recheios gourmet selecionados
        const recheiosGourmet = [];
        document.querySelectorAll('input[name="recheio-gourmet"]:checked').forEach(recheio => {
            recheiosGourmet.push(recheio.value);
        });
        
        // Verificar se mais de 2 recheios gourmet foram selecionados
        if (recheiosGourmet.length > 2) {
            alert('Você pode selecionar no máximo 2 recheios gourmet!');
            return;
        }
        
        // Calcular preço total do item
        let precoItem = precos[tipoChurros];
        precoItem += recheiosGourmet.length * adicionalGourmet;
        
        // Criar objeto do item
        const item = {
            tipo: tipoChurros,
            recheiosNormais: recheiosNormais,
            recheiosGourmet: recheiosGourmet,
            preco: precoItem
        };
        
        // Adicionar ao carrinho
        carrinho.push(item);
        
        // Atualizar carrinho
        atualizarCarrinho(localStorage.setItem('carrinho', JSON.stringify(carrinho)));
        
        
        
        // Limpar seleções (opcional)
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    });
    
    // Evento para finalizar pedido
    btnFinalizar.addEventListener('click', function() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        alert('Pedido finalizado com sucesso! Total: R$ ' + calcularTotal().toFixed(2));
        carrinho = [];
        atualizarCarrinho();
    });
    
    // Função para atualizar a exibição do carrinho
    function atualizarCarrinho() {
        // Limpar carrinho
        itensCarrinho.innerHTML = '';
        
        if (carrinho.length === 0) {
            itensCarrinho.innerHTML = '<p class="vazio">Seu carrinho está vazio</p>';
            totalCarrinho.textContent = '0,00';
            return;
        }
        
        // Adicionar cada item ao carrinho
        carrinho.forEach((item, index) => {
            const divItem = document.createElement('div');
            divItem.className = 'item-carrinho';
            
            // Descrição do item
            const descricao = document.createElement('div');
            descricao.innerHTML = `<strong>${item.tipo}</strong><br>`;
            
            if (item.recheiosNormais.length > 0) {
                descricao.innerHTML += `Recheios: ${item.recheiosNormais.join(', ')}<br>`;
            }
            
            if (item.recheiosGourmet.length > 0) {
                descricao.innerHTML += `Gourmet: ${item.recheiosGourmet.join(', ')}<br>`;
            }
            
            // Preço do item
            const preco = document.createElement('div');
            preco.textContent = `R$ ${item.preco.toFixed(2)}`;
            
            // Botão para remover item
            const btnRemover = document.createElement('button');
            btnRemover.innerHTML = '<i class="fas fa-trash"></i>';
            btnRemover.className = 'remover-item';
            btnRemover.addEventListener('click', () => removerItem(index));
            
            divItem.appendChild(descricao);
            divItem.appendChild(preco);
            divItem.appendChild(btnRemover);
            
            itensCarrinho.appendChild(divItem);
        });
        
        // Atualizar total
        totalCarrinho.textContent = calcularTotal().toFixed(2);
    }
    
    // Função para remover item do carrinho
    function removerItem(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }
    
    // Função para calcular total do carrinho
    function calcularTotal() {
        return carrinho.reduce((total, item) => total + item.preco, 0);
    }
});