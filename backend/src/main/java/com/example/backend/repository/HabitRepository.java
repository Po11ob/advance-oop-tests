package com.example.backend.repository;

import com.example.backend.model.Habit;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class HabitRepository {

    private final JdbcTemplate jdbc;

    private final RowMapper<Habit> rowMapper = (rs, rowNum) -> {
        Habit h = new Habit();
        long id = rs.getLong("id");
        if (!rs.wasNull()) h.setId(id);
        h.setName(rs.getString("name"));
        h.setFrequency(rs.getString("frequency"));
        h.setStatus(rs.getInt("status") != 0);
        h.setNote(rs.getString("note"));
        return h;
    };

    public HabitRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Habit> findAll() {
        return jdbc.query("SELECT id, name, frequency, status, note FROM habits", rowMapper);
    }

    public Optional<Habit> findById(Long id) {
        var list = jdbc.query("SELECT id, name, frequency, status, note FROM habits WHERE id = ?", rowMapper, id);
        return list.stream().findFirst();
    }

    public Habit save(Habit habit) {
        if (habit.getId() == null) {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbc.update(con -> {
                PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO habits(name, frequency, status, note) VALUES(?,?,?,?)",
                        Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, habit.getName());
                ps.setString(2, habit.getFrequency());
                ps.setInt(3, habit.isStatus() ? 1 : 0);
                ps.setString(4, habit.getNote());
                return ps;
            }, keyHolder);
            Number key = keyHolder.getKey();
            if (key != null) habit.setId(key.longValue());
            return habit;
        } else {
            jdbc.update("UPDATE habits SET name = ?, frequency = ?, status = ?, note = ? WHERE id = ?",
                    habit.getName(), habit.getFrequency(), habit.isStatus() ? 1 : 0, habit.getNote(), habit.getId());
            return habit;
        }
    }

    public boolean existsById(Long id) {
        Integer count = jdbc.queryForObject("SELECT COUNT(1) FROM habits WHERE id = ?", Integer.class, id);
        return count != null && count > 0;
    }

    public void deleteById(Long id) {
        jdbc.update("DELETE FROM habits WHERE id = ?", id);
    }
}

