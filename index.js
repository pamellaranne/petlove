fetch("https://api-seedmais.mais.com.br/api/Faq/GetAllFaqLP", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})
    .then((response) => {
        if (!response.ok) throw new Error("Erro na API");
        return response.json();
    })
    .then((data) => {
        IncludeDivTypeFaq(data.data);
    })
    .catch(function (error) {
        console.warn("API oficial falhou. Carregando dados locais...");

        const fallbackData = {
            success: true,
            data: [
                {
                    id: 1,
                    category: "Principal",
                    show_lp: true,
                    number_order: 0,
                    created_at: "2024-09-13T09:49:59",
                    updated_at: "2024-09-13T09:49:59",
                    list_faqs: [
                        {
                            id: 1,
                            title: "Qualquer pessoa pode criar sua loja na plataforma? ",
                            description: "Sim, qualquer pessoa física maior de 18 anos pode criar uma loja na plataforma. Lembrando que é necessário ter uma conta bancária para receber as comissões.",
                            status: "A",
                            created_at: "2024-09-13T09:49:58.764437",
                            updated_at: "2024-09-13T09:49:58.764437",
                            fk_id_faq_category: 1
                        },
                        {
                            id: 2,
                            title: "Qualquer pessoa pode criar sua loja na plataforma? ",
                            description: "Sim, qualquer pessoa física maior de 18 anos pode criar uma loja na plataforma. Lembrando que é necessário ter uma conta bancária para receber as comissões.",
                            status: "A",
                            created_at: "2024-09-13T09:49:58.764437",
                            updated_at: "2024-09-13T09:49:58.764437",
                            fk_id_faq_category: 1
                        }
                    ]
                }
            ]
        };

        IncludeDivTypeFaq(fallbackData.data);
    });


function IncludeDivTypeFaq(list) {
    const faqContainer = document.getElementById("faq-container");

    if (list.length > 0) {
        list.forEach((item) => {
            item.list_faqs.forEach((element) => {
                const itemFaq = document.createElement("div");
                itemFaq.className = "faq-item";

                const question = document.createElement("div");
                question.className = "faq-question";
                question.innerHTML = element.title;

                const answer = document.createElement("div");
                answer.className = "faq-answer";
                answer.innerHTML = element.description;
                answer.style.display = "none";

                question.addEventListener("click", () => {
                    const isVisible = answer.style.display === "block";

                    document.querySelectorAll(".faq-answer").forEach((el) => {
                        el.style.display = "none";
                    });
                    document.querySelectorAll(".faq-question").forEach((el) => {
                        el.classList.remove("open");
                    });

                    if (!isVisible) {
                        answer.style.display = "block";
                        question.classList.add("open");
                    }
                });

                itemFaq.appendChild(question);
                itemFaq.appendChild(answer);
                faqContainer.appendChild(itemFaq);
            });
        });
    }
}
