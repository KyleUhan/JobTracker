/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.tracker.jobtracker.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Kyle Uhan
 */
@Entity
@Table(name = "worklog")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Worklog.findAll", query = "SELECT w FROM Worklog w"),
    @NamedQuery(name = "Worklog.findByWorklogId", query = "SELECT w FROM Worklog w WHERE w.worklogId = :worklogId"),
    @NamedQuery(name = "Worklog.findByWorklogStartdate", query = "SELECT w FROM Worklog w WHERE w.worklogStartdate = :worklogStartdate"),
    @NamedQuery(name = "Worklog.findByWorklogEnddate", query = "SELECT w FROM Worklog w WHERE w.worklogEnddate = :worklogEnddate"),
    @NamedQuery(name = "Worklog.findByWorklogClient", query = "SELECT w FROM Worklog w WHERE w.worklogClient = :worklogClient"),
    @NamedQuery(name = "Worklog.findByWorklogUsername", query = "SELECT w FROM Worklog w WHERE w.worklogUsername = :worklogUsername"),
    @NamedQuery(name = "Worklog.findByUserName", query = "SELECT w FROM Worklog w WHERE w.worklogUsername = :worklogUserName")})
public class Worklog implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "worklog_id")
    private Integer worklogId;
    @Column(name = "worklog_startdate")
    @Temporal(TemporalType.DATE)
    private Date worklogStartdate;
    @Column(name = "worklog_enddate")
    @Temporal(TemporalType.DATE)
    private Date worklogEnddate;
    @Size(max = 255)
    @Column(name = "worklog_client")
    private String worklogClient;
    @Size(max = 255)
    @Column(name = "worklog_username")
    private String worklogUsername;

    public Worklog() {
    }

    public Worklog(Integer worklogId) {
        this.worklogId = worklogId;
    }

    public Integer getWorklogId() {
        return worklogId;
    }

    public void setWorklogId(Integer worklogId) {
        this.worklogId = worklogId;
    }

    public Date getWorklogStartdate() {
        return worklogStartdate;
    }

    public void setWorklogStartdate(Date worklogStartdate) {
        this.worklogStartdate = worklogStartdate;
    }

    public Date getWorklogEnddate() {
        return worklogEnddate;
    }

    public void setWorklogEnddate(Date worklogEnddate) {
        this.worklogEnddate = worklogEnddate;
    }

    public String getWorklogClient() {
        return worklogClient;
    }

    public void setWorklogClient(String worklogClient) {
        this.worklogClient = worklogClient;
    }

    public String getWorklogUsername() {
        return worklogUsername;
    }

    public void setWorklogUsername(String worklogUsername) {
        this.worklogUsername = worklogUsername;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (worklogId != null ? worklogId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Worklog)) {
            return false;
        }
        Worklog other = (Worklog) object;
        if ((this.worklogId == null && other.worklogId != null) || (this.worklogId != null && !this.worklogId.equals(other.worklogId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.tracker.jobtracker.model.Worklog[ worklogId=" + worklogId + " ]";
    }

}
