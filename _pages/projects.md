---
layout: page
title: projects
permalink: /projects/
description: Selected research projects and associated publications.
nav: true
nav_order: 3
display_categories: [research]
horizontal: false
---

Selected projects are listed below. Where a standalone project website is not yet available, links to the public preprint or publication are provided.

<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  {% for category in page.display_categories %}
    {% assign categorized_projects = site.projects | where: "category", category %}
    {% assign sorted_projects = categorized_projects | sort: "importance" %}
    <div class="row row-cols-1 row-cols-md-3">
      {% for project in sorted_projects %}
        {% include projects.liquid %}
      {% endfor %}
    </div>
  {% endfor %}
{% endif %}
</div>
