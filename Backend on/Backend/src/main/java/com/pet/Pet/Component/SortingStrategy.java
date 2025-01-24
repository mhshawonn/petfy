package com.pet.Pet.Component;

import org.springframework.data.domain.Sort;

public interface SortingStrategy {
    Sort getSort(String attribute, int order);
}
