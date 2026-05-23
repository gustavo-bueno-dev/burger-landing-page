let busca = document.querySelector(".campo-busca")
let categorias = document.querySelectorAll(".categoria")

let botaoLogin = document.querySelector(".botao-login")
let loginContainer = document.querySelector(".login-container")
let site = document.querySelector(".site")
let usuarioLogado = document.querySelector(".usuario-logado")

if (busca) {
    busca.addEventListener("input", () => {

        let valor = busca.value.toLowerCase().trim()

        categorias.forEach(cat => {

            let nome = cat.getAttribute("data-categoria")

            if (nome.includes(valor) || valor === "") {
                cat.style.display = "block"
            } else {
                cat.style.display = "none"
            }

        })
    })

}

function esconderTelas(nome) {
    site.style.display = "none"
    checkoutTela.style.display = "none"
    rastreamento.style.display = "none"
    admin.style.display = "none"
}
let cards = document.querySelectorAll(".card")
let lista = document.querySelector(".lista-sacola")
let totalElemento = document.querySelector(".total")

let total = 0

cards.forEach(card => {
    card.addEventListener("click", () => {

        let nome = card.getAttribute("data-nome")
        let preco = parseFloat(card.getAttribute("data-preco"))

        let itemExistente = lista.querySelector(`[data-item="${nome}"]`)

        if (itemExistente) {

            let quantidadeSpan = itemExistente.querySelector(".quantidade")
            let quantidade = parseInt(quantidadeSpan.textContent)

            quantidade++
            quantidadeSpan.textContent = quantidade

        } else {

            let item = document.createElement("li")

            item.setAttribute("data-item", nome)
            item.setAttribute("data-preco", preco)

            item.innerHTML = `
            <span class="nome-item">${nome}</span>
            <span class="quantidade">1</span>
            </span>
            <span class="preco-item">R$ ${preco.toFixed(2).replace(".", ",")}</span>
            <button class="remover">➖</button>
            `

            lista.appendChild(item)

            let botaoRemover = item.querySelector(".remover")

            botaoRemover.addEventListener("click", () => {

                let quantidadeSpan = item.querySelector(".quantidade")
                let quantidade = parseInt(quantidadeSpan.textContent)

                if (quantidade > 1) {
                    quantidade--
                    quantidadeSpan.textContent = quantidade
                } else {
                    item.remove()
                }

                total -= preco

                if (total < 0) {
                    total = 0
                }

                totalElemento.textContent = total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })

            })

        }

        total += preco

        totalElemento.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

    })
})

let finalizar = document.querySelector(".botao-finalizar")
let checkoutTela = document.querySelector(".checkout-tela")

if (finalizar) {
    finalizar.addEventListener("click", () => {

        if (lista.children.length === 0) {
            alert("Sua sacola está vazia!")
            return
        }

        site.style.display = "none"
        checkoutTela.style.display = "flex"

    })

}

let confirmarPedido = document.querySelector(".confirmar-pedido");

if (confirmarPedido) {
    confirmarPedido.addEventListener("click", () => {

        let codigoPedido = Math.floor(Math.random() * 9000) + 1000
        let tipo = document.querySelector(".tipo-pedido").value
        let pagamento = document.querySelector(".pagamento").value
        let rua = document.querySelector(".rua").value.trim()
        let numero = document.querySelector(".numero").value.trim()
        let bairro = document.querySelector(".bairro").value.trim()

        if (tipo === "Entrega") {
            if (rua === "" || numero === "" || bairro === "") {
                alert("Preencha o endereço!")
                return
            }
        }

        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

        let itensPedido = []

        lista.querySelectorAll("li").forEach(item => {
            itensPedido.push(item.textContent)
        })

        pedidos.push({
            codigo: codigoPedido,
            tipo: tipo,
            pagamento: pagamento,
            itens: itensPedido
        })

        localStorage.setItem("pedidos", JSON.stringify(pedidos))

        alert(`Seu pedido está sendo feito.Logo logo ele estará a caminho 🍔🚀
    Número do pedido: #${codigoPedido}`)

        lista.innerHTML = ""
        total = 0
        checkoutTela.style.display = "none"
        rastreamento.style.display = "block"
    })


    totalElemento.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

}

botaoLogin.addEventListener("click", () => {

    let email = document.querySelector(".email").value.trim()
    let senha = document.querySelector(".senha").value.trim()

    let emailSalvo = localStorage.getItem("email")
    let senhaSalva = localStorage.getItem("senha")

    if (email === "" || senha === "") {
        alert("Preencha E-mail e Senha!")
        return
    }

    if (email === emailSalvo && senha === senhaSalva) {

        localStorage.setItem("logado", "sim")

        usuarioLogado.textContent = `Olá, ${email} 👋`

        loginContainer.style.display = "none"
        site.style.display = "block"

    }

    else {

        alert("Email ou senha incorretos ❌")

    }

})

let botaoCriar = document.querySelector(".botao-criar")

if (botaoCriar) {
    botaoCriar.addEventListener("click", () => {

        let email = document.querySelector(".email").value.trim()
        let senha = document.querySelector(".senha").value.trim()

        if (email === "" || senha === "") {
            alert("Preencha E-mail e Senha!")
            return
        }

        localStorage.setItem("email", email)
        localStorage.setItem("senha", senha)

        alert("Conta criada com sucesso 🎉")

    })

}

let botaoSair = document.querySelector(".botao-sair")

if (botaoSair) {
    botaoSair.addEventListener("click", () => {

        localStorage.removeItem("logado")
        site.style.display = "none"
        loginContainer.style.display = "flex"

        document.querySelector(".email").value = ""
        document.querySelector(".senha").value = ""

    })

}

if (localStorage.getItem("logado") === "sim") {

    if (loginContainer) {
        loginContainer.style.display = "none"
    }

    if (site) {
        site.style.display = "block"
    }
}
if (localStorage.getItem("logado") === "sim") {
    let emailSalvo = localStorage.getItem("email")

    if (usuarioLogado) {
        usuarioLogado.textContent = `Olá, ${emailSalvo} 👋`
    }

    if (loginContainer) {
        loginContainer.style.display = "none"
    }

    if (site) {
        site.style.display = "block"
    }

}

let trocarSenha = document.querySelector(".trocar-senha")

if (trocarSenha) {
    trocarSenha.addEventListener("click", () => {

        let novaSenha = document.querySelector(".nova-senha").value.trim()

        if (novaSenha === "") {
            alert("Digite uma nova senha!!!")
            return
        }

        localStorage.setItem("senha", novaSenha)

        alert("Senha alterada com sucesso! 🔐")

        document.querySelector(".nova-senha").value = ""

    })
}

let tipoPedido = document.querySelector(".tipo-pedido")
let enderecoBox = document.querySelector(".endereco-box")

if (tipoPedido) {
    tipoPedido.addEventListener("change", () => {

        if (tipoPedido.value === "Entrega") {
            enderecoBox.style.display = "flex"
        } else {
            enderecoBox.style.display = "none"
        }

    })

}

let abrirAdmin = document.querySelector(".abrir-admin")
let admin = document.querySelector(".admin")
let listaPedidos = document.querySelector(".lista-pedidos")
let fecharAdmin = document.querySelector(".fechar-admin")

if (abrirAdmin) {
    abrirAdmin.addEventListener("click", () => {

        site.style.display = "none"
        admin.style.display = "flex"


        listaPedidos.innerHTML = ""

        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

        pedidos.forEach((pedido, index) => {

            let li = document.createElement("li")

            li.innerHTML = `
                <strong> #${pedido.codigo}</strong> <br>
                    ${pedido.tipo} - ${pedido.pagamento}<br>
                        ${(pedido.itens || []).join("<br>")}
                        <br><button class="concluir">✅</button>
                            `

            listaPedidos.appendChild(li)

            let botaoConcluir = li.querySelector(".concluir")

            botaoConcluir.addEventListener("click", () => {

                pedidos.splice(index, 1)
                localStorage.setItem("pedidos", JSON.stringify(pedidos))
                li.remove()

                alert("Pedido Concluído!")
            })

        })

    })

}

if (fecharAdmin) {
    fecharAdmin.addEventListener("click", () => {

        admin.style.display = "none"
        site.style.display = "block"
    })

}

function mostrarTela(nome) {
    site.style.display = "none"
    checkoutTela.style.display = "none"
    admin.style.display = "none"

    nome.style.display = "flex"
}

let notificacao = document.querySelector(".notificacao")

function avisar(msg) {
    notificacao.textContent = msg
    notificacao.classList.add("show")


    setTimeout(() => {
        notificacao.classList.remove("show")
    }, 2000)
}               

let botaoObservacao = document.querySelector(".botao-observacao")

if (botaoObservacao) {
    botaoObservacao.addEventListener("click", () => {

        let observacao = document.querySelector(".observacao").value.trim()

        if (observacao === "") {
            alert("Digite uma observação!!!")
            return
        }

        localStorage.setItem("observacao", botaoObservacao)

        alert("Observação enviada com sucesso!👀")

        document.querySelector(".botao-observacao").value = ""

    })

}

const botaoCarrinho = document.querySelector(".botao-carrinho");

if (botaoCarrinho) {
    botaoCarrinho.addEventListener("click", function () {
        console.log("click")
    });

}

if (botaoObservacao) {
    document.getElementById("botaoObservacao").addEventListener("click", function () {
        document.getElementById("observacao").value = " ";
    });

}