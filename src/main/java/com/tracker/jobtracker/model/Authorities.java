/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.tracker.jobtracker.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Kyle Uhan
 */
@Entity
@Table(name = "authorities")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Authorities.findAll", query = "SELECT a FROM Authorities a"),
    @NamedQuery(name = "Authorities.findByAuthority", query = "SELECT a FROM Authorities a WHERE a.authority = :authority"),
    @NamedQuery(name = "Authorities.findByAuthoritiesId", query = "SELECT a FROM Authorities a WHERE a.authoritiesId = :authoritiesId")})
public class Authorities implements Serializable {
    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "authority")
    private String authority;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "authorities_id")
    private Integer authoritiesId;
    @JoinColumn(name = "username", referencedColumnName = "username")
    @ManyToOne(optional = false)
    private Users username;

    public Authorities() {
    }

    public Authorities(Integer authoritiesId) {
        this.authoritiesId = authoritiesId;
    }

    public Authorities(Integer authoritiesId, String authority) {
        this.authoritiesId = authoritiesId;
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public Integer getAuthoritiesId() {
        return authoritiesId;
    }

    public void setAuthoritiesId(Integer authoritiesId) {
        this.authoritiesId = authoritiesId;
    }

    public Users getUsername() {
        return username;
    }

    public void setUsername(Users username) {
        this.username = username;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (authoritiesId != null ? authoritiesId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Authorities)) {
            return false;
        }
        Authorities other = (Authorities) object;
        if ((this.authoritiesId == null && other.authoritiesId != null) || (this.authoritiesId != null && !this.authoritiesId.equals(other.authoritiesId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.tracker.jobtracker.model.Authorities[ authoritiesId=" + authoritiesId + " ]";
    }

}
