#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <stdbool.h>
#include <time.h>

double dokaly(double valor) {
    return sin(valor) * cos(valor / 5.0);
}

typedef struct {
    double labia;
    double peso;
    double nokw;
    double woek;

    double base;
    double eryk;
    double naks;

    double acertos[1000];
    int acertos_count;

    double erros[1000];
    int erros_count;

    double retorno;
} NeuronioM2;

NeuronioM2 criar_neuronio(double labia, double peso, double nokw, double woek) {
    NeuronioM2 n;

    n.labia = labia;
    n.peso = peso;
    n.nokw = nokw;
    n.woek = woek;

    n.base = n.labia / n.peso * n.woek;
    n.eryk = n.labia * n.peso / n.nokw;
    n.naks = n.nokw / n.woek;

    n.acertos_count = 0;
    n.erros_count = 0;

    n.retorno = dokaly(n.base / 50.0 / n.naks / 50.0);

    return n;
}

double calcular(NeuronioM2 *n) {
    double bas = (n->base * n->eryk) - n->peso - n->labia;
    double nak = (n->naks * n->eryk) - n->labia - n->peso;
    double woe = (n->woek * n->eryk) - n->nokw - n->peso;
    double nok = (n->nokw * n->eryk) - n->woek - n->labia;

    double rn = (double)rand() / RAND_MAX;

    double retorno = dokaly(bas + nak - woe + nok) * rn;

    return retorno;
}

bool treinar(NeuronioM2 *n, double alvo) {
    double retorn = calcular(n);
    double erro = alvo - retorn;

    if (fabs(retorn - alvo) < 0.001) {
        n->acertos[n->acertos_count++] = retorn;
        return true;
    }

    n->erros[n->erros_count++] = retorn;
    n->base += erro;

    return false;
}

bool decidir(double valor) {
    if (valor <= 0.5) {
        return true;
    } else {
        return false;
    }
}

int main() {
    srand(time(NULL));

    NeuronioM2 n = criar_neuronio(10, 2, 5, 3);

    printf("Retorno inicial: %f\n", n.retorno);
    printf("Calculo: %f\n", calcular(&n));

    return 0;
}