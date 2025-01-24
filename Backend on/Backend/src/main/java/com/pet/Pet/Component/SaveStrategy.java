package com.pet.Pet.Component;

import com.pet.Pet.Model.Saved;
import org.springframework.data.domain.Page;

public interface SaveStrategy {
    void processSave(Saved saved);
    Page<?> getSaved(int page, String sortAttribute, int order, Long userId);
}
