import 'package:flutter/material.dart';

class CustomBottomNavigator extends StatefulWidget {
  final int currentIndex;
  final Function(int) onTap;

  const CustomBottomNavigator({
    Key? key,
    required this.currentIndex,
    required this.onTap,
  }) : super(key: key);

  @override
  _CustomBottomNavigatorState createState() => _CustomBottomNavigatorState();
}

class _CustomBottomNavigatorState extends State<CustomBottomNavigator>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late AnimationController _rippleController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rippleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: Duration(milliseconds: 300),
      vsync: this,
    );
    _rippleController = AnimationController(
      duration: Duration(milliseconds: 400),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.elasticOut),
    );
    _rippleAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _rippleController, curve: Curves.easeOut),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    _rippleController.dispose();
    super.dispose();
  }

  void _onItemTapped(int index) {
    widget.onTap(index);
    _animationController.forward().then((_) {
      _animationController.reverse();
    });
    _rippleController.forward().then((_) {
      _rippleController.reset();
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final bottomNavTheme = theme.bottomNavigationBarTheme;

    return Container(
      height: 80,
      decoration: BoxDecoration(
        color: bottomNavTheme.backgroundColor,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            offset: Offset(0, -2),
            blurRadius: 10,
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _buildNavItem(Icons.home, 0, 'Home', theme),
          _buildNavItem(Icons.search, 1, 'Search', theme),
          _buildNavItem(Icons.person, 2, 'Profile', theme),
        ],
      ),
    );
  }

  Widget _buildNavItem(
    IconData icon,
    int index,
    String label,
    ThemeData theme,
  ) {
    bool isSelected = widget.currentIndex == index;
    final bottomNavTheme = theme.bottomNavigationBarTheme;

    return GestureDetector(
      onTap: () => _onItemTapped(index),
      child: AnimatedBuilder(
        animation: Listenable.merge([_animationController, _rippleController]),
        builder: (context, child) {
          return Container(
            width: 70,
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Ripple effect
                if (isSelected && _rippleAnimation.value > 0)
                  Container(
                    width: 50 * _rippleAnimation.value,
                    height: 50 * _rippleAnimation.value,
                    decoration: BoxDecoration(
                      color: bottomNavTheme.selectedItemColor!.withOpacity(0.2),
                      shape: BoxShape.circle,
                    ),
                  ),
                // Main icon container
                Transform.scale(
                  scale: isSelected ? _scaleAnimation.value : 1.0,
                  child: Container(
                    padding: EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? bottomNavTheme.selectedItemColor!.withOpacity(0.2)
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          icon,
                          color: isSelected
                              ? bottomNavTheme.selectedItemColor
                              : bottomNavTheme.unselectedItemColor,
                          size: isSelected ? 26 : 24,
                        ),
                        SizedBox(height: 2),
                        Text(
                          label,
                          style: isSelected
                              ? bottomNavTheme.selectedLabelStyle
                              : bottomNavTheme.unselectedLabelStyle,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
