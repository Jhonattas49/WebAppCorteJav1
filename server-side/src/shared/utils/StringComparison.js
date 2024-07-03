/**
 * @filename StringComparison.js 
 * @class StringComparison
 * @namespace 'src/shared/utils' 
 * @description **A função recebe um array e um prefixo como parâmetros**
 * O array é filtrado usando o método filter, que mantém apenas os itens 
 * que começam com o prefixo normalizado. 
 * A comparação é feita usando startsWith após converter cada item do array 
 * para minúsculas. Para casos onde o prefixo não coincide exatamente, 
 * a função retorna o item mais semelhante com base na similaridade de strings.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [28/06/2024]
 */
'use strict';

exports.OrdinalIgnoreCase = (array, prefix) => {
    // Normaliza o prefixo para minúsculas
    const lowerCasePrefix = prefix.toLowerCase();
    // Filtra o array comparando cada item com o prefixo normalizado
    const filteredArray = array.filter(item => item.toLowerCase().startsWith(lowerCasePrefix));
    // Se houver correspondências exatas, retorná-las
    if (filteredArray.length > 0) {
        return filteredArray;
    }

    // Função para calcular a similaridade entre duas strings
    const similarity = (s1, s2) => {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        const longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    };

    // Função para calcular a distância de edição (Levenshtein)
    const editDistance = (s1, s2) => {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0) {
                costs[s2.length] = lastValue;
            }
        }
        return costs[s2.length];
    };

    // Função para encontrar a melhor correspondência baseada em similaridade
    const findBestMatch = (array, target) => {
        let bestMatch = '';
        let highestSimilarity = 0;

        array.forEach(item => {
            const sim = similarity(item, target);
            if (sim > highestSimilarity) {
                highestSimilarity = sim;
                bestMatch = item;
            }
        });

        return bestMatch;
    };

    // Se não houver correspondências exatas, encontrar a melhor correspondência
    const bestMatch = findBestMatch(array, lowerCasePrefix);
    return [bestMatch];
};
