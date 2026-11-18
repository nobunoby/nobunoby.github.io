---
layout: page
permalink: /publications/
title: publications
description: Journal articles, conference papers, and preprints.
nav: true
nav_order: 2
---

The list below includes peer-reviewed publications and preprints; a preprint is not presented as a peer-reviewed conference or journal paper until that status is verified.

<link rel="stylesheet" href="{{ '/assets/css/publications-custom.css' | relative_url }}">

{% include bib_search.liquid %}

<div class="publication-keyword-filter" hidden>
  <label for="publication-keyword">Filter by research area</label>
  <select id="publication-keyword">
    <option value="">All research areas</option>
  </select>
</div>

{% capture keyword_entries %}{% bibliography --group_by none --template '{{key}}|{{entry.keywords}}' %}{% endcapture %}
<template id="publication-keyword-data">{{ keyword_entries }}</template>
<script src="{{ '/assets/js/publication-keywords.js' | relative_url }}" defer></script>

<div class="publications">
{% bibliography %}
</div>
