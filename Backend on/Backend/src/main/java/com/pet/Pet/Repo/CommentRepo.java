package com.pet.Pet.Repo;

import com.pet.Pet.DTO.CommentDTO;
import com.pet.Pet.Model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends JpaRepository<Comment,Long> {

    @Query("SELECT new com.pet.Pet.DTO.CommentDTO( " +
            "c.id, c.content, c.commentDate, c.reactCount, c.reactType, c.numberOfChildComments, " +
            "c.isBanned, c.media, uFrom.id, uFrom.username, uFrom.profilePic, uTo.username " +
            ") " +
            "FROM Comment c " +
            "LEFT JOIN c.userFrom uFrom " +
            "LEFT JOIN c.userTo uTo " +
            "WHERE c.blog.id = :blogId")
    Page<CommentDTO> findComment(Pageable pageable, @Param("blogId") Long blogId);

    @Query("SELECT new com.pet.Pet.DTO.CommentDTO( " +
            "c.id, c.content, c.commentDate, c.reactCount, c.reactType, c.numberOfChildComments, " +
            "c.isBanned, c.media, uFrom.id, uFrom.username, uFrom.profilePic, uTo.username " +
            ") " +
            "FROM Comment c " +
            "LEFT JOIN c.userFrom uFrom " +
            "LEFT JOIN c.userTo uTo " +
            "WHERE c.blog.id = :blogId AND c.parent.id = :parentId")
    Page<CommentDTO> findReply(Pageable pageable, @Param("blogId") Long blogId, @Param("parentId") Long parentId);
}
