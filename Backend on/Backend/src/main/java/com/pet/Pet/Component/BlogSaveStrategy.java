package com.pet.Pet.Component;

import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Saved;
import com.pet.Pet.Repo.BlogRepo;
import com.pet.Pet.Repo.SavedRepo;
import com.pet.Pet.Service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class BlogSaveStrategy implements SaveStrategy {
    private final BlogRepo blogRepo;
    private final BlogService blogService;
    private final SavedRepo savedRepo;
    private final SortingStrategy sortingStrategy;

    @Autowired
    public BlogSaveStrategy(BlogRepo blogRepo, BlogService blogService,
                            SavedRepo savedRepo, SortingStrategy sortingStrategy) {
        this.blogRepo = blogRepo;
        this.blogService = blogService;
        this.savedRepo = savedRepo;
        this.sortingStrategy = sortingStrategy;
    }

    @Override
    public void processSave(Saved saved) {
        Blog blog = blogRepo.findById(saved.getPostId()).orElse(null);
        saved.setBlog(blog);
    }

    @Override
    public Page<Blog> getSaved(int page, String sortAttribute, int order, Long userId) {
        Sort sort = sortingStrategy.getSort(sortAttribute, order);
        Pageable pageable = PageRequest.of(page, 10, sort);
        return blogService.processBlog(savedRepo.findSavedBlog(pageable, userId), userId);
    }
}
