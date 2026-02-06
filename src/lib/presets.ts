import type { StarshipPreset } from '@/types';

export const presets: StarshipPreset[] = [
  {
    id: 'nerd-font-symbols',
    name: 'Nerd Font Symbols',
    description: 'Changes symbols for each module to use Nerd Font symbols',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

[aws]
symbol = " "

[buf]
symbol = " "

[bun]
symbol = " "

[c]
symbol = " "

[cpp]
symbol = " "

[cmake]
symbol = " "

[conda]
symbol = " "

[crystal]
symbol = " "

[dart]
symbol = " "

[deno]
symbol = " "

[directory]
read_only = " 󰌾"

[docker_context]
symbol = " "

[elixir]
symbol = " "

[elm]
symbol = " "

[fennel]
symbol = " "

[fortran]
symbol = " "

[fossil_branch]
symbol = " "

[gcloud]
symbol = " "

[git_branch]
symbol = " "

[git_commit]
tag_symbol = '  '

[golang]
symbol = " "

[gradle]
symbol = " "

[guix_shell]
symbol = " "

[haskell]
symbol = " "

[haxe]
symbol = " "

[hg_branch]
symbol = " "

[hostname]
ssh_symbol = " "

[java]
symbol = " "

[julia]
symbol = " "

[kotlin]
symbol = " "

[lua]
symbol = " "

[memory_usage]
symbol = "󰍛 "

[meson]
symbol = "󰔷 "

[nim]
symbol = "󰆥 "

[nix_shell]
symbol = " "

[nodejs]
symbol = " "

[ocaml]
symbol = " "

[os.symbols]
Alpaquita = " "
Alpine = " "
AlmaLinux = " "
Amazon = " "
Android = " "
AOSC = " "
Arch = " "
Artix = " "
CachyOS = " "
CentOS = " "
Debian = " "
DragonFly = " "
Elementary = " "
Emscripten = " "
EndeavourOS = " "
Fedora = " "
FreeBSD = " "
Garuda = "󰛓 "
Gentoo = " "
HardenedBSD = "󰞌 "
Illumos = "󰈸 "
Ios = "󰀷 "
Kali = " "
Linux = " "
Mabox = " "
Macos = " "
Manjaro = " "
Mariner = " "
MidnightBSD = " "
Mint = " "
NetBSD = " "
NixOS = " "
Nobara = " "
OpenBSD = "󰈺 "
openSUSE = " "
OracleLinux = "󰌷 "
Pop = " "
Raspbian = " "
Redhat = " "
RedHatEnterprise = " "
RockyLinux = " "
Redox = "󰀘 "
Solus = "󰠳 "
SUSE = " "
Ubuntu = " "
Unknown = " "
Void = " "
Windows = "󰍲 "
Zorin = " "

[package]
symbol = "󰏗 "

[perl]
symbol = " "

[php]
symbol = " "

[pijul_channel]
symbol = " "

[pixi]
symbol = "󰏗 "

[python]
symbol = " "

[rlang]
symbol = "󰟔 "

[ruby]
symbol = " "

[rust]
symbol = "󱘗 "

[scala]
symbol = " "

[status]
symbol = " "

[swift]
symbol = " "

[xmake]
symbol = " "

[zig]
symbol = " "`,
  },
  {
    id: 'pastel-powerline',
    name: 'Pastel Powerline',
    description: 'A colorful powerline-style prompt with pastel colors',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

format = """
[](#9A348E)\
$os\
$username\
[](bg:#DA627D fg:#9A348E)\
$directory\
[](fg:#DA627D bg:#FCA17D)\
$git_branch\
$git_status\
[](fg:#FCA17D bg:#86BBD8)\
$c\
$elixir\
$elm\
$golang\
$gradle\
$haskell\
$java\
$julia\
$nodejs\
$nim\
$rust\
$scala\
[](fg:#86BBD8 bg:#06969A)\
$docker_context\
[](fg:#06969A bg:#33658A)\
$time\
[ ](fg:#33658A)\
"""

# Disable the blank line at the start of the prompt
# add_newline = false

# You can also replace your username with a neat symbol like   or disable this
# and use the os module below
[username]
show_always = true
style_user = "bg:#9A348E"
style_root = "bg:#9A348E"
format = '[$user ]($style)'
disabled = false

# An alternative to the username module which displays a symbol that
# represents the current operating system
[os]
style = "bg:#9A348E"
disabled = true # Disabled by default

[directory]
style = "bg:#DA627D"
format = "[ $path ]($style)"
truncation_length = 3
truncation_symbol = "…/"

# Here is how you can shorten some long paths by text replacement
# similar to mapped_locations in Oh My Posh:
[directory.substitutions]
"Documents" = "󰈙 "
"Downloads" = " "
"Music" = " "
"Pictures" = " "
# Keep in mind that the order matters. For example:
# "Important Documents" = " 󰈙 "
# will not be replaced, because "Documents" was already substituted before.
# So either put "Important Documents" before "Documents" or use the substituted version:
# "Important 󰈙 " = " 󰈙 "

[c]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[cpp]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[docker_context]
symbol = " "
style = "bg:#06969A"
format = '[ $symbol $context ]($style)'

[elixir]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[elm]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[git_branch]
symbol = ""
style = "bg:#FCA17D"
format = '[ $symbol $branch ]($style)'

[git_status]
style = "bg:#FCA17D"
format = '[$all_status$ahead_behind ]($style)'

[golang]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[gradle]
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[haskell]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[java]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[julia]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[nodejs]
symbol = ""
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[nim]
symbol = "󰆥 "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[rust]
symbol = ""
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[scala]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[time]
disabled = false
time_format = "%R"
style = "bg:#33658A"
format = '[ ♥ $time ]($style)'`,
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    description: 'Inspired by tokyo-night-vscode-theme with deep blues',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

format = """
[░▒▓](#a3aed2)\
[  ](bg:#a3aed2 fg:#090c0c)\
[](bg:#769ff0 fg:#a3aed2)\
$directory\
[](fg:#769ff0 bg:#394260)\
$git_branch\
$git_status\
[](fg:#394260 bg:#212736)\
$nodejs\
$rust\
$golang\
$php\
[](fg:#212736 bg:#1d2230)\
$time\
[ ](fg:#1d2230)\
\n$character"""

[directory]
style = "fg:#e3e5e5 bg:#769ff0"
format = "[ $path ]($style)"
truncation_length = 3
truncation_symbol = "…/"

[directory.substitutions]
"Documents" = "󰈙 "
"Downloads" = " "
"Music" = " "
"Pictures" = " "

[git_branch]
symbol = ""
style = "bg:#394260"
format = '[[ $symbol $branch ](fg:#769ff0 bg:#394260)]($style)'

[git_status]
style = "bg:#394260"
format = '[[($all_status$ahead_behind )](fg:#769ff0 bg:#394260)]($style)'

[nodejs]
symbol = ""
style = "bg:#212736"
format = '[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)'

[rust]
symbol = ""
style = "bg:#212736"
format = '[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)'

[golang]
symbol = ""
style = "bg:#212736"
format = '[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)'

[php]
symbol = ""
style = "bg:#212736"
format = '[[ $symbol ($version) ](fg:#769ff0 bg:#212736)]($style)'

[time]
disabled = false
time_format = "%R"
style = "bg:#1d2230"
format = '[[  $time ](fg:#a0a9cb bg:#1d2230)]($style)'`,
  },
  {
    id: 'gruvbox-rainbow',
    name: 'Gruvbox Rainbow',
    description: 'Warm earthy colors inspired by Gruvbox theme',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

format = """
[](#d65d0e)\
$os\
$username\
[](bg:#d79921 fg:#d65d0e)\
$directory\
[](fg:#d79921 bg:#689d6a)\
$git_branch\
$git_status\
[](fg:#689d6a bg:#458588)\
$c\
$cpp\
$rust\
$golang\
$nodejs\
$php\
$java\
$kotlin\
$haskell\
$python\
[](fg:#458588 bg:#665c54)\
$docker_context\
$conda\
$pixi\
[](fg:#665c54 bg:#3c3836)\
$time\
[ ](fg:#3c3836)\
$line_break$character"""

palette = 'gruvbox_dark'

[palettes.gruvbox_dark]
color_fg0 = '#fbf1c7'
color_bg1 = '#3c3836'
color_bg3 = '#665c54'
color_blue = '#458588'
color_aqua = '#689d6a'
color_green = '#98971a'
color_orange = '#d65d0e'
color_purple = '#b16286'
color_red = '#cc241d'
color_yellow = '#d79921'

[os]
disabled = false
style = "bg:#d65d0e fg:#fbf1c7"

[os.symbols]
Windows = "󰍲"
Ubuntu = "󰕈"
SUSE = ""
Raspbian = "󰐿"
Mint = "󰣭"
Macos = "󰀵"
Manjaro = ""
Linux = "󰌽"
Gentoo = "󰣨"
Fedora = "󰣛"
Alpine = ""
Amazon = ""
Android = ""
AOSC = ""
Arch = "󰣇"
Artix = "󰣇"
EndeavourOS = ""
CentOS = ""
Debian = "󰣚"
Redhat = "󱄛"
RedHatEnterprise = "󱄛"
Pop = ""

[username]
show_always = true
style_user = "bg:#d65d0e fg:#fbf1c7"
style_root = "bg:#d65d0e fg:#fbf1c7"
format = '[ $user ]($style)'

[directory]
style = "fg:#fbf1c7 bg:#d79921"
format = "[ $path ]($style)"
truncation_length = 3
truncation_symbol = "…/"

[directory.substitutions]
"Documents" = "󰈙 "
"Downloads" = " "
"Music" = "󰝚 "
"Pictures" = " "
"Developer" = "󰲋 "

[git_branch]
symbol = ""
style = "bg:#689d6a"
format = '[[ $symbol $branch ](fg:#fbf1c7 bg:#689d6a)]($style)'

[git_status]
style = "bg:#689d6a"
format = '[[($all_status$ahead_behind )](fg:#fbf1c7 bg:#689d6a)]($style)'

[nodejs]
symbol = ""
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[c]
symbol = " "
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[cpp]
symbol = " "
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[rust]
symbol = ""
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[golang]
symbol = ""
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[php]
symbol = ""
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[java]
symbol = ""
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[kotlin]
symbol = ""
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[haskell]
symbol = ""
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[python]
symbol = ""
style = "bg:#458588"
format = '[[ $symbol( $version) ](fg:#fbf1c7 bg:#458588)]($style)'

[docker_context]
symbol = ""
style = "bg:#665c54"
format = '[[ $symbol( $context) ](fg:#83a598 bg:#665c54)]($style)'

[conda]
style = "bg:#665c54"
format = '[[ $symbol( $environment) ](fg:#83a598 bg:#665c54)]($style)'

[pixi]
style = "bg:#665c54"
format = '[[ $symbol( $version)( $environment) ](fg:#fbf1c7 bg:#665c54)]($style)'

[time]
disabled = false
time_format = "%R"
style = "bg:#3c3836"
format = '[[  $time ](fg:#fbf1c7 bg:#3c3836)]($style)'

[line_break]
disabled = false

[character]
disabled = false
success_symbol = '[](bold fg:#98971a)'
error_symbol = '[](bold fg:#cc241d)'
vimcmd_symbol = '[](bold fg:#98971a)'
vimcmd_replace_one_symbol = '[](bold fg:#b16286)'
vimcmd_replace_symbol = '[](bold fg:#b16286)'
vimcmd_visual_symbol = '[](bold fg:#d79921)'`,
  },
  {
    id: 'bracketed-segments',
    name: 'Bracketed Segments',
    description: 'Shows all segments in brackets instead of default wording',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

[aws]
format = '\\[[$symbol($profile)(\\($region\\))(\\[$duration\\])]($style)\\]'

[cmd_duration]
format = '\\[[⏱ $duration]($style)\\]'

[conda]
format = '\\[[$symbol$environment]($style)\\]'

[docker_context]
format = '\\[[$symbol$context]($style)\\]'

[git_branch]
format = '\\[[$symbol$branch]($style)\\]'

[git_status]
format = '([\\[$all_status$ahead_behind\\]]($style))'

[golang]
format = '\\[[$symbol($version)]($style)\\]'

[java]
format = '\\[[$symbol($version)]($style)\\]'

[kubernetes]
format = '\\[[$symbol$context( \\($namespace\\))]($style)\\]'

[nodejs]
format = '\\[[$symbol($version)]($style)\\]'

[package]
format = '\\[[$symbol$version]($style)\\]'

[php]
format = '\\[[$symbol($version)]($style)\\]'

[python]
format = '\\[[\${symbol}\${pyenv_prefix}(\${version})(\\($virtualenv\\))]($style)\\]'

[ruby]
format = '\\[[$symbol($version)]($style)\\]'

[rust]
format = '\\[[$symbol($version)]($style)\\]'

[terraform]
format = '\\[[$symbol$workspace]($style)\\]'

[time]
format = '\\[[$time]($style)\\]'

[username]
format = '\\[[$user]($style)\\]'`,
  },
  {
    id: 'plain-text',
    name: 'Plain Text Symbols',
    description: 'Uses plain text instead of special characters or icons',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

continuation_prompt = "[.](#5C6370) "

[character]
success_symbol = "[>](bold #98C379)"
error_symbol = "[x](bold #E06C75)"
vimcmd_symbol = "[<](bold #98C379)"

[git_commit]
tag_symbol = " tag "

[git_status]
ahead = ">"
behind = "<"
diverged = "<>"
renamed = "r"
deleted = "x"

[aws]
symbol = "aws "

[buf]
symbol = "buf "

[c]
symbol = "C "

[conda]
symbol = "conda "

[dart]
symbol = "dart "

[directory]
read_only = " ro"

[docker_context]
symbol = "docker "

[git_branch]
symbol = "git "
truncation_symbol = "..."

[golang]
symbol = "go "

[java]
symbol = "java "

[kotlin]
symbol = "kt "

[lua]
symbol = "lua "

[nodejs]
symbol = "nodejs "

[package]
symbol = "pkg "

[php]
symbol = "php "

[python]
symbol = "py "

[ruby]
symbol = "rb "

[rust]
symbol = "rs "

[swift]
symbol = "swift "

[terraform]
symbol = "terraform "`,
  },
  {
    id: 'pure-preset',
    name: 'Pure',
    description: 'Emulates the look and behavior of Pure prompt',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

format = """
$username\\
$hostname\\
$directory\\
$git_branch\\
$git_state\\
$git_status\\
$cmd_duration\\
$line_break\\
$python\\
$character"""

[directory]
style = "#61AFEF"

[character]
success_symbol = "[❯](#C678DD)"
error_symbol = "[❯](#E06C75)"
vimcmd_symbol = "[❮](#98C379)"

[git_branch]
format = "[$branch]($style)"
style = "#5C6370"

[git_status]
format = "[[(*$conflicted$untracked$modified$staged$renamed$deleted)](#FFAFD7) ($ahead_behind$stashed)]($style)"
style = "#56B6C2"
conflicted = "​"
untracked = "​"
modified = "​"
staged = "​"
renamed = "​"
deleted = "​"
stashed = "≡"

[git_state]
format = '\\([$state( $progress_current/$progress_total)]($style)\\) '
style = "#5C6370"

[cmd_duration]
format = "[$duration]($style) "
style = "#E5C07B"

[python]
format = "[$virtualenv]($style) "
style = "#5C6370"
detect_extensions = []
detect_files = []`,
  },
  {
    id: 'no-runtime-versions',
    name: 'No Runtime Versions',
    description: 'Hides version numbers for all language runtimes',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

[bun]
format = "via [$symbol]($style)"

[c]
format = "via [$symbol]($style)"

[cmake]
format = "via [$symbol]($style)"

[cobol]
format = "via [$symbol]($style)"

[crystal]
format = "via [$symbol]($style)"

[dart]
format = "via [$symbol]($style)"

[deno]
format = "via [$symbol]($style)"

[dotnet]
format = "[$symbol(🎯 $tfm )]($style)"

[elixir]
format = 'via [$symbol]($style)'

[elm]
format = 'via [$symbol]($style)'

[erlang]
format = 'via [$symbol]($style)'

[fennel]
format = 'via [$symbol]($style)'

[golang]
format = 'via [$symbol]($style)'

[haskell]
format = 'via [$symbol]($style)'

[java]
format = 'via [$symbol]($style)'

[julia]
format = 'via [$symbol]($style)'

[kotlin]
format = 'via [$symbol]($style)'

[lua]
format = 'via [$symbol]($style)'

[nim]
format = 'via [$symbol]($style)'

[nodejs]
format = 'via [$symbol]($style)'

[ocaml]
format = 'via [$symbol(\\($switch_indicator$switch_name\\) )]($style)'

[perl]
format = 'via [$symbol]($style)'

[php]
format = 'via [$symbol]($style)'

[python]
format = 'via [$symbol]($style)'

[rlang]
format = 'via [$symbol]($style)'

[ruby]
format = 'via [$symbol]($style)'

[rust]
format = 'via [$symbol]($style)'

[scala]
format = 'via [$symbol]($style)'

[swift]
format = 'via [$symbol]($style)'

[zig]
format = 'via [$symbol]($style)'`,
  },
  {
    id: 'no-empty-icons',
    name: 'No Empty Icons',
    description: 'Does not show icons if the toolset is not found',
    toml: `"$schema" = 'https://starship.rs/config-schema.json'

[aws]
format = 'on [$symbol($profile )(\\($region\\) )(\\[$duration\\] )]($style)'
symbol = "☁️ "

[bun]
format = "via [$symbol]($style)"

[buf]
format = "via [$symbol]($style)"

[cmake]
format = "via [$symbol]($style)"

[cobol]
format = "via [$symbol]($style)"

[crystal]
format = "via [$symbol]($style)"

[dart]
format = "via [$symbol]($style)"

[deno]
format = "via [$symbol]($style)"

[docker_context]
only_with_files = true

[dotnet]
format = "[$symbol(🎯 $tfm )]($style)"

[elixir]
format = 'via [$symbol]($style)'

[elm]
format = 'via [$symbol]($style)'

[erlang]
format = 'via [$symbol]($style)'

[gcloud]
format = 'on [$symbol$account(@$domain)(\\($region\\))]($style) '

[golang]
format = 'via [$symbol]($style)'

[gradle]
format = 'via [$symbol]($style)'

[haskell]
format = 'via [$symbol]($style)'

[java]
format = 'via [$symbol]($style)'

[julia]
format = 'via [$symbol]($style)'

[kotlin]
format = 'via [$symbol]($style)'

[kubernetes]
format = 'on [$symbol$context( \\($namespace\\))]($style) '

[lua]
format = 'via [$symbol]($style)'

[meson]
format = 'via [$symbol]($style)'

[nim]
format = 'via [$symbol]($style)'

[nix_shell]
format = 'via [$symbol]($style)'

[nodejs]
format = 'via [$symbol]($style)'

[ocaml]
format = 'via [$symbol(\\($switch_indicator$switch_name\\) )]($style)'

[perl]
format = 'via [$symbol]($style)'

[php]
format = 'via [$symbol]($style)'

[pulumi]
format = 'via [$symbol$stack]($style)'

[purescript]
format = 'via [$symbol]($style)'

[python]
format = 'via [$symbol]($style)'

[rlang]
format = 'via [$symbol]($style)'

[ruby]
format = 'via [$symbol]($style)'

[rust]
format = 'via [$symbol]($style)'

[scala]
format = 'via [$symbol]($style)'

[swift]
format = 'via [$symbol]($style)'

[vagrant]
format = 'via [$symbol]($style)'

[zig]
format = 'via [$symbol]($style)'`,
  },
];

export function getPresetById(id: string): StarshipPreset | undefined {
  return presets.find((p) => p.id === id);
}

