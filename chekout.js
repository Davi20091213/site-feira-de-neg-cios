document.addEventListener('DOMContentLoaded', function() {
    // Recupera os itens do carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const resumoPedido = document.getElementById('resumo-pedido');
    const formPedido = document.getElementById('form-pedido');
    
    // Exibe o resumo do pedido
    function exibirResumoPedido() {
        if (carrinho.length === 0) {
            resumoPedido.innerHTML = '<p>Nenhum item no pedido</p>';
            return;
        }
        
        let html = '<h3>Resumo do Pedido</h3><ul>';
        let total = 0;
        
        carrinho.forEach(item => {
            html += `
                <li>
                    <strong>${item.tipo}</strong><br>
                    ${item.recheiosNormais.length > 0 ? 'Recheios: ' + item.recheiosNormais.join(', ') + '<br>' : ''}
                    ${item.recheiosGourmet.length > 0 ? 'Gourmet: ' + item.recheiosGourmet.join(', ') + '<br>' : ''}
                    R$ ${item.preco.toFixed(2)}
                </li>
            `;
            total += item.preco;
        });
        
        html += `</ul><div class="total">Total: R$ ${total.toFixed(2)}</div>`;
        resumoPedido.innerHTML = html;
    }
    
    // Envia o pedido para o WhatsApp
    function enviarParaWhatsApp(dadosCliente) {
        let mensagem = `*NOVO PEDIDO - MIX CHURROS*%0A%0A`;
        mensagem += `*Cliente:* ${dadosCliente.nome}%0A`;
        mensagem += `*Telefone:* ${dadosCliente.telefone}%0A`;
        
        if (dadosCliente.observacoes) {
            mensagem += `*Observações:* ${dadosCliente.observacoes}%0A%0A`;
        } else {
            mensagem += `%0A`;
        }
        
        mensagem += `*ITENS DO PEDIDO:*%0A%0A`;
        
        let total = 0;
        carrinho.forEach((item, index) => {
            mensagem += `*Item ${index + 1}:* ${item.tipo}%0A`;
            
            if (item.recheiosNormais.length > 0) {
                mensagem += `- Recheios: ${item.recheiosNormais.join(', ')}%0A`;
            }
            
            if (item.recheiosGourmet.length > 0) {
                mensagem += `- Gourmet: ${item.recheiosGourmet.join(', ')}%0A`;
            }
            
            mensagem += `*Preço:* R$ ${item.preco.toFixed(2)}%0A%0A`;
            total += item.preco;
        });
        
        mensagem += `*TOTAL DO PEDIDO: R$ ${total.toFixed(2)}*`;
        
        // Número do WhatsApp - substitua pelo seu número
        const numeroWhatsApp = '5543996156791'; // (43) 99615-6791 no formato internacional
        
        // Abre o WhatsApp com a mensagem pré-formatada
        window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');
        
        // Limpa o carrinho após enviar
        localStorage.removeItem('carrinho');
    }
    
    // Manipulador do formulário
    formPedido.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dadosCliente = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            observacoes: document.getElementById('observacoes').value
        };
        
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        enviarParaWhatsApp(dadosCliente);
    });
    
    // Inicializa a página
    exibirResumoPedido();
});
function enviarParaWhatsApp(dadosCliente) {
    // ... (código anterior)
    
    carrinho.forEach((item, index) => {
        mensagem += `*Item ${index + 1}:* ${item.tipo}%0A`;
        mensagem += `- ${item.canela}%0A`;  // Linha da canela
        
        // ... (restante do código)
    });
    
    // ... (código posterior)
}
