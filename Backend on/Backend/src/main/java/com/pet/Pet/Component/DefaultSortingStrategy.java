package com.pet.Pet.Component;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class DefaultSortingStrategy implements SortingStrategy {
    @Override
    public Sort getSort(String attribute, int order) {
        if (attribute == null) attribute = "id";
        return (order == 0) ? Sort.by(Sort.Order.desc(attribute)) : Sort.by(Sort.Order.asc(attribute));
    }
}

